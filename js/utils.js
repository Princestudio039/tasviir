function safeGet(id) {
  const el = document.getElementById(id);
  // Only warn for truly critical elements, not optional CMS elements
  const optionalIds = [
    'theme-toggle-btn', 'debug-cart-count', 'tasveer-debug-console-wrap',
    'debug-active-cat', 'cms-bento-grid', 'bento-grid-container',
    'cms-bento-tag', 'cms-bento-title', 'cart-final-total-val',
    'cart-items-list', 'wishlist-items-list', 'quickview-modal-overlay'
  ];
  if (!el && !optionalIds.includes(id)) {
    console.warn(`[Tasveer] Missing element: #${id}`);
  }
  return el;
}

// Razorpay is configured only when server env vars are present.
window.RAZORPAY_KEY_ID = '';

if (typeof fetch === 'function') {
    fetch('/api/payment/config')
        .then(response => response.ok ? response.json() : null)
        .then(config => {
            if (config && config.keyId) {
                window.RAZORPAY_KEY_ID = config.keyId;
            }
        })
        .catch(() => {
            // No-op: checkout will gracefully fall back when Razorpay is not configured.
        });
}

