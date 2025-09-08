#00ffff;
    --primary-magenta: #ff00ff;
    --primary-blue: #0080ff;
    --bg-dark: #0a0a0a;
    --bg-dark-secondary: #1a1a2e;
    --bg-dark-tertiary: #16213e;
    --text-primary: #e0e0e0;
    --text-secondary: #b0b0b0;
    --text-muted: #888;
    --success-color: #00ff88;
    --error-color: #ff4444;
    --warning-color: #ffaa00;
}

/* Add Turkish-supporting font globally */
html, body, input, textarea, button, select {
    font-family: 'Rajdhani', 'Orbitron', 'Exo 2', 'Inter', 'Roboto', 'Noto Sans', 'Open Sans', Arial, sans-serif;
}

/* Add overflow/word-break/hyphens for text-heavy elements */
.about-text,
.about-text p,
.service-content p,
.service-item h3,
.feature-tag,
.btn,
.tab-btn,
.nav-menu a,
.footer-section ul li a,
.footer-section ul li {
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
}

/* Allow buttons, tags, nav links to wrap text if needed */
.btn,
.tab-btn,
.feature-tag,
.nav-menu a {
    white-space: normal;
    min-width: 0;
}

/* Responsive: allow nav links and buttons to wrap on mobile */
@media (max-width: 768px) {
    .nav-menu a,
    .btn,
    .tab-btn,
    .feature-tag {
        white-space: normal;
        min-width: 0;
    }
}

/* Light mode variables - Professional Dark Theme */
[data-theme="light"] {
    --primary-cyan: #1a365d;
    --primary-magenta: #2d3748;
    --primary-blue: #2b6cb0;
    --bg-dark: #f7fafc;
    --bg-dark-secondary: #edf2f7;
    --bg-dark-tertiary: #e2e8f0;
    --text-primary: #1a202c;
    --text-secondary: #4a5568;
    --text-muted: #718096;
    --success-color: #38a169;
    --error-color: #e53e3e;
    --warning-color: #d69e2e;
}

/* Light mode specific styling */
[data-theme="light"] body {
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #e2e8f0 100%);
}

[data-theme="light"] body::before {
    background: 
        radial-gradient(circle at 20% 80%, rgba(26, 54, 93, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(45, 55, 72, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(43, 108, 176, 0.03) 0%, transparent 50%);
}

/* Additional styles continue here... */

<!-- filepath: d:\WORKSPACE\website\portfolio\portfolio Final latest version\script.js -->
// This file is intentionally left blank.