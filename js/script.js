// js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // *** MODIFIED SELECTOR ***
    const sidebarLinks = document.querySelectorAll('#sidebar .nav-link[data-page]'); // Target <a> tags with data-page
    const contentArea = document.getElementById('content-area');
    const initialContent = contentArea.innerHTML; // Store initial content if needed

    // Function to load content (remains the same)
    function loadContent(pageUrl) {
        contentArea.innerHTML = '<div class="d-flex justify-content-center align-items-center" style="min-height: 200px;"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';
        fetch(pageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                contentArea.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading page:', error);
                contentArea.innerHTML = `<div class="alert alert-danger" role="alert">Failed to load page content. Please try again later. Error: ${error.message}</div>`;
            });
    }

    // Add click event listeners to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior

            // Remove 'active' class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add 'active' class to the clicked link (the <a> tag itself)
            this.classList.add('active'); // *** 'this' is now the <a> tag ***

            const page = this.getAttribute('data-page'); // Get the page path from data-page attribute
            if (page) {
                loadContent(page);
            } else {
                console.error('Link does not have a data-page attribute:', this);
                contentArea.innerHTML = '<div class="alert alert-warning" role="alert">Link configuration error.</div>';
            }
        });
    });

    // Optional: Load a default page on initial visit
    // If you want Page 1 to load by default, uncomment this and ensure
    // the corresponding link in index.html also has the 'active' class initially.
    // const firstPageLink = document.querySelector('#sidebar .nav-link[data-page="pages/page1.html"]');
    // if (firstPageLink) {
    //     // firstPageLink.classList.add('active'); // Already added in HTML if uncommenting
    //     loadContent(firstPageLink.getAttribute('data-page'));
    // }

}); // End DOMContentLoaded
