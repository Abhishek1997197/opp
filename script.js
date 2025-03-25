function startAutomation() {
    const url = document.getElementById('websiteInput').value;
    if (!url) {
        alert('Please enter a website URL');
        return;
    }

    document.getElementById('container').innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.onload = function () {
            automateBrowsing(iframe);
        };
        document.getElementById('container').appendChild(iframe);
    }
}

function automateBrowsing(iframe) {
    setInterval(() => {
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            const links = doc.querySelectorAll('a');

            // Simulate scrolling
            iframe.contentWindow.scrollBy(0, Math.random() * 300 - 150);

            // Simulate clicking somewhere randomly on the page
            if (links.length > 0) {
                links[Math.floor(Math.random() * links.length)].click();
            } else {
                const elements = doc.body.getElementsByTagName('*');
                if (elements.length > 0) {
                    elements[Math.floor(Math.random() * elements.length)].click();
                }
            }
        } catch (error) {
            console.error('Cross-origin restriction prevents access to the site:', error);
        }
    }, Math.random() * 5000 + 2000); // Random intervals between actions
}
