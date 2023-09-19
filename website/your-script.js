// Định nghĩa hàm khi nút được nhấp
function startBot() {
    // Thực hiện các hành động để khởi động bot Discord ở đây
    // Ví dụ: bạn có thể gửi một yêu cầu HTTP đến máy chủ của bot để kích hoạt nó.

    // Ví dụ sử dụng fetch để gửi yêu cầu POST đến máy chủ bot
    fetch('index.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'start' })
    })
    .then(response => {
        if (response.ok) {
            alert('Bot đã được khởi động thành công!');
        } else {
            alert('Không thể khởi động bot. Vui lòng thử lại sau.');
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

// Gắn sự kiện click vào nút
const startBotButton = document.getElementById('startBotButton');
startBotButton.addEventListener('click', startBot);
