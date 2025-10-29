btn = document.querySelector('.theme')
container = document.querySelector('.container')
btn.addEventListener('click', function() {
    if (container.classList.contains('light')) {
        container.classList.remove('light');
        container.classList.add('dark');
    } else if (container.classList.contains('dark')) {
        container.classList.remove('dark');
        container.classList.add('light')
    }
    }
)

