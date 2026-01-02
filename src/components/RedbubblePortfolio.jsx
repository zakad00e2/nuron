import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const RedbubblePortfolio = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const domain = "www.redbubble.com";
    const userName = "orion26";
    const rows = 2;
    const columns = 2;

    const width = 240 * columns + 26;
    const height = 222 * rows + 85;
    const src = `https://${domain}/people/${userName}/external-portfolio?count=${rows * columns}`;

    if (!mounted) return null;

    // Colors based on Nuron template variables
    // Dark: Black as requested
    // Light: --color-gray-2 (#f5f8fa)
    const isDark = theme === 'dark';
    const backgroundColor = isDark ? '#000000' : '#f5f8fa';
    const borderColor = isDark ? '#ffffff14' : '#e6e6e6';

    return (
        <div className="redbubble-portfolio-wrapper rn-section-gapTop" 
            style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                width: '100%',
                padding: '30px',
                backgroundColor: backgroundColor,
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                marginTop: '50px',
                transition: 'background-color 0.3s ease, border-color 0.3s ease'
            }}>
            <iframe
                src={src}
                width={width}
                height={height}
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
                title="Redbubble Portfolio"
            />
        </div>
    );
};

export default RedbubblePortfolio;
