#!/usr/bin/env python3
"""Refresh the published recurring Mass schedule for Kim Hải.

Fail closed on a missing/malformed parish source; do not overwrite existing data.
This is not an official special-day/holiday schedule.
"""
from __future__ import annotations
from datetime import datetime, timezone
from pathlib import Path
import json
import re
import sys
import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / 'mass-schedule.json'
SOURCE = ('https://www.giaophanbaria.org/gioi-thieu/cac-giao-hat/'
          'giao-hat-long-huong/2012/12/05/giao-xu-kim-hai.html')
DAYS = {
    1: (r'thứ\s*hai', r'thứ\s*2', r'\bt2\b'),
    2: (r'thứ\s*ba', r'thứ\s*3', r'\bt3\b'),
    3: (r'thứ\s*tư', r'thứ\s*4', r'\bt4\b'),
    4: (r'thứ\s*năm', r'thứ\s*5', r'\bt5\b'),
    5: (r'thứ\s*sáu', r'thứ\s*6', r'\bt6\b'),
    6: (r'thứ\s*bảy', r'thứ\s*7', r'\bt7\b'),
}
TIME_RE = re.compile(r'(?<!\d)(\d{1,2})\s*(?:g|h|:|giờ)\s*(\d{1,2})(?!\d)', re.I)

def times(text):
    return sorted({int(h) * 60 + int(m) for h, m in TIME_RE.findall(text)
                   if 0 <= int(h) < 24 and 0 <= int(m) < 60})

def day_numbers(text):
    return [d for d, variants in DAYS.items()
            if any(re.search(v, text, re.I) for v in variants)]

def parse_page(html):
    soup = BeautifulSoup(html, 'html.parser')
    for node in soup(['script', 'style', 'noscript']):
        node.decompose()
    flat = ' '.join(soup.get_text(' ', strip=True).split())
    if not re.search(r'GIÁO\s+XỨ\s+KIM\s+HẢI', flat, re.I):
        raise ValueError('Kim Hải parish heading not found')
    match = re.search(
        r'1\s*/\s*GIỜ\s+LỄ\s+HÀNG\s+NGÀY\s*:?\s*(.*?)'
        r'2\s*/\s*GIỜ\s+LỄ\s+CHÚA\s+NHẬT\s*:?\s*(.*?)'
        r'(?=QUÁ\s+TRÌNH|3\s*/|CƠ\s+SỞ\s+VẬT\s+CHẤT|$)',
        flat, re.I | re.S)
    if not match:
        raise ValueError('Published timetable sections not found')
    weekday, weekend = match.groups()
    morning = re.search(r'\bSáng\s*:\s*([^()]+)\(([^)]+)\)', weekday, re.I)
    afternoon = re.search(r'\bChiều\s*:\s*([^()]+)\(([^)]+)\)', weekday, re.I)
    if not morning:
        raise ValueError('Weekday morning timetable unreadable')
    weekly = {str(day): [] for day in range(7)}
    for part in (morning, afternoon):
        if part is None:
            continue
        tt, dd = times(part.group(1)), day_numbers(part.group(2))
        if not tt or not dd:
            raise ValueError('Weekday time/day unreadable')
        for day in dd:
            weekly[str(day)].extend(tt)
    sat = re.search(r'\bThứ\s*(?:7|bảy)\s*:\s*([^*]+?)(?=\*\s*Chúa\s*nhật|Chúa\s*nhật\s*:|$)', weekend, re.I)
    sun = re.search(r'\bChúa\s*nhật\s*:\s*(.*?)(?=\*|$)', weekend, re.I)
    if not sat or not sun:
        raise ValueError('Weekend timetable unreadable')
    weekly['6'] += times(sat.group(1))
    weekly['0'] += times(sun.group(1))
    for day in range(7):
        weekly[str(day)] = sorted(set(weekly[str(day)]))
    if any(not weekly[str(d)] for d in range(7)):
        raise ValueError('Incomplete weekly timetable')
    if len(weekly['0']) > 8 or len(weekly['6']) > 8 or sum(map(len, weekly.values())) > 45:
        raise ValueError('Suspicious time count')
    return weekly

def update():
    response = requests.get(
        SOURCE, timeout=28,
        headers={'User-Agent': 'Mozilla/5.0 (compatible; KimHaiPrayerSite/1.0)',
                 'Accept': 'text/html,application/xhtml+xml'})
    response.raise_for_status()
    weekly = parse_page(response.text)
    existing = json.loads(OUTPUT.read_text(encoding='utf-8'))
    now = datetime.now(timezone.utc).isoformat(timespec='seconds').replace('+00:00', 'Z')
    changed = existing.get('weekly') != weekly
    existing.update({
        'weekly': weekly,
        'last_checked_at': now,
        'last_schedule_change_detected_at': now if changed else existing.get('last_schedule_change_detected_at')
    })
    OUTPUT.write_text(json.dumps(existing, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(('Schedule changed' if changed else 'Schedule unchanged') + ' at ' + now)

if __name__ == '__main__':
    try:
        update()
    except (ValueError, OSError, requests.RequestException) as exc:
        print('ERROR: previous schedule retained: ' + str(exc), file=sys.stderr)
        sys.exit(1)
