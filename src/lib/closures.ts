type Period = { starts_on: string; ends_on: string };

// UTC so a plain YYYY-MM-DD day never shifts with the visitor's time zone.
export function closedText(periods: Period[], lang: string): string {
  const fmt = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const parts: string[] = [];
  for (const { starts_on, ends_on } of periods) {
    const a = new Date(starts_on);
    const b = new Date(ends_on);
    if (isNaN(+a) || isNaN(+b)) return '';
    parts.push(fmt.formatRange(a, b));
  }
  return parts.join(' · ');
}
