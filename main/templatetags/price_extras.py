from django import template

register = template.Library()

@register.filter
def discounted(price, discount):
    """Return price after applying percentage discount (integer/float). Handles None gracefully."""
    try:
        if price is None:
            return 0
        if not discount:
            return float(price)
        final = float(price) * (1 - float(discount)/100)
        # Avoid negative
        if final < 0:
            final = 0
        # Format with two decimals, strip trailing zeros elegantly
        return ("{:.2f}".format(final)).rstrip('0').rstrip('.')
    except Exception:
        return price
