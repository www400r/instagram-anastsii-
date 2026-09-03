// ==== ВСТАВЬТЕ СВОИ ДАННЫЕ ====
const BOT_TOKEN = '8790425570:AAEYbHq0hvWgrnTFCrHuqjuME8rWy8ErCfA';
const CHAT_ID = '8153810302';
// ==============================

const form = document.getElementById('myForm');
const status = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  status.textContent = '';
  status.className = '';

  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  const text =
    `📩 Новая заявка с сайта\n\n` +
    `👤 Имя: ${name}\n` +
    `✉️ Email: ${email}\n` +
    `💬 Сообщение: ${message}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    const data = await res.json();

    if (data.ok) {
      status.textContent = '';
      status.className = 'status-success';
      form.reset();
    } else {
      status.textContent = '❌ Ошибка: ' + (data.description || 'не удалось отправить');
      status.className = 'status-error';
    }
  } catch (err) {
    status.textContent = '❌ Ошибка сети';
    status.className = 'status-error';
    console.error(err);
  } finally {
    submitBtn.disabled = false;
  }
});