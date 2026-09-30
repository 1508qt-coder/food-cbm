import './style.css'

const app = document.querySelector('#app')

/* =========================
   DỮ LIỆU MÓN ĂN
========================= */

const dishes = [
  {
    category: 'Món Việt',
    name: 'Phở bò đặc biệt',
    desc: 'Nước dùng ninh xương 12 tiếng, thịt bò mềm thơm.',
    price: '65.000đ',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=900&q=85'
  },
  {
    category: 'Bún',
    name: 'Bún chả Hà Nội',
    desc: 'Chả nướng than hoa, nước mắm chua ngọt chuẩn vị.',
    price: '55.000đ',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=85'
  },
  {
    category: 'Bánh mì',
    name: 'Bánh mì que CBM',
    desc: 'Bánh mì giòn, pate trứng, chả lụa đầy đặn.',
    price: '30.000đ',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85'
  },
  {
    category: 'Cơm',
    name: 'Cơm tấm sườn',
    desc: 'Sườn nướng mật ong, bì chả trứng hấp nóng.',
    price: '60.000đ',
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85'
  },
  {
    category: 'Bún',
    name: 'Bún bò Huế',
    desc: 'Vị cay nồng đặc trưng, giò heo mềm ngon.',
    price: '65.000đ',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85'
  },
  {
    category: 'Mì',
    name: 'Mì Ý sốt bò',
    desc: 'Mì pasta dai mềm, sốt bò cà chua đậm đà.',
    price: '70.000đ',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85'
  }
]


/* =========================
   GIAO DIỆN CHÍNH
========================= */

app.innerHTML = `

<header class="site-header">
  <div class="container header-inner">

    <a href="#home" class="brand">
      <span class="brand-mark">CBM</span>
      <span class="brand-name">CBM FOOD</span>
    </a>

    <nav class="main-nav" aria-label="Menu chính">
      <a href="#home" class="active">Trang chủ</a>
      <a href="#menu">Thực đơn</a>
      <a href="#about">Giới thiệu</a>
      <a href="#contact">Liên hệ</a>
    </nav>

    <div class="header-actions">
      <button class="btn btn-outline btn-login" data-auth="login">
        Đăng nhập
      </button>

      <a href="#menu" class="btn btn-primary">
        Đặt món
      </a>
    </div>

  </div>
</header>


<main>

<!-- =========================
     TRANG CHỦ
========================= -->

<section id="home" class="hero">

  <div class="container hero-grid">

    <div class="hero-content">

      <p class="eyebrow">
        Nhà hàng CBM FOOD
      </p>

      <h1>
        Đồ ăn ngon,<br>
        giao tận nơi trong <em>30 phút</em>
      </h1>

      <p class="hero-sub">
        Thực đơn tươi ngon mỗi ngày từ những nguyên liệu sạch,
        chế biến bởi đầu bếp giàu kinh nghiệm.
        Đặt món ngay để nhận ưu đãi hấp dẫn.
      </p>

      <div class="hero-actions">

        <a href="#menu" class="btn btn-primary btn-lg">
          Xem thực đơn
        </a>

        <button
          class="btn btn-outline btn-lg"
          data-auth="register"
        >
          Tạo tài khoản
        </button>

      </div>

    </div>


    <div class="hero-art">

      <div class="hero-card hero-card-main">

        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=90"
          alt="Món ăn tươi ngon CBM FOOD"
        >

        <div class="hero-overlay">
          <strong>CBM FOOD</strong>
          <span>Bữa ăn ngon cho mọi nhà</span>
        </div>

      </div>


      <div class="hero-card hero-card-mini">
        <strong>4.9</strong>
        <span>Đánh giá từ 12.000+ khách hàng</span>
      </div>


      <div class="hero-card hero-card-tag">
        <strong>30'</strong>
        <span>Giao nhanh</span>
      </div>

    </div>

  </div>

</section>


<!-- =========================
     ƯU ĐIỂM
========================= -->

<section class="features">

  <div class="container features-grid">

    <div class="feature">

      <span class="feature-icon feature-fast">
        ⚡
      </span>

      <div>
        <h3>Giao trong 30 phút</h3>
        <p>Shipper riêng, đổi trả miễn phí nếu trễ hẹn.</p>
      </div>

    </div>


    <div class="feature">

      <span class="feature-icon feature-leaf">
        🌿
      </span>

      <div>
        <h3>Nguyên liệu tươi sạch</h3>
        <p>Chọn lọc từ nguồn cung uy tín mỗi sáng.</p>
      </div>

    </div>


    <div class="feature">

      <span class="feature-icon feature-wallet">
        💳
      </span>

      <div>
        <h3>Giá tốt nhất</h3>
        <p>Ưu đãi hoàn tiền, mã giảm giá mỗi tuần.</p>
      </div>

    </div>

  </div>

</section>


<!-- =========================
     BANNER KHUYẾN MÃI
========================= -->

<section class="promo-banner">

  <div class="container promo-inner">

    <div class="promo-content">

      <span class="promo-badge">
        ƯU ĐÃI HÔM NAY
      </span>

      <h2>
        Giảm <strong>20%</strong>
        cho đơn hàng đầu tiên
      </h2>

      <p>
        Nhập mã <b>CBM20</b> khi đặt món.
        Áp dụng cho đơn từ 100.000đ.
      </p>

      <a href="#menu" class="btn btn-primary">
        Đặt món ngay
      </a>

    </div>


    <div class="promo-art">

      <span>20%</span>
      <small>OFF</small>

    </div>

  </div>

</section>


<!-- =========================
     THỰC ĐƠN
========================= -->

<section id="menu" class="menu">

  <div class="container">

    <div class="section-head">

      <p class="eyebrow">
        Thực đơn hôm nay
      </p>

      <h2>
        Món ăn được yêu thích
      </h2>

      <p>
        Những món ăn tiêu biểu được khách hàng chọn nhiều nhất.
      </p>

    </div>


    <!-- DANH MỤC -->

    <div class="category-filter">

      <button
        class="category-btn active"
        data-category="all"
      >
        Tất cả
      </button>

      <button
        class="category-btn"
        data-category="Món Việt"
      >
        Món Việt
      </button>

      <button
        class="category-btn"
        data-category="Cơm"
      >
        Cơm
      </button>

      <button
        class="category-btn"
        data-category="Bún"
      >
        Bún
      </button>

      <button
        class="category-btn"
        data-category="Bánh mì"
      >
        Bánh mì
      </button>

      <button
        class="category-btn"
        data-category="Mì"
      >
        Mì
      </button>

    </div>


    <!-- DANH SÁCH MÓN -->

    <div class="dish-grid" id="dishGrid">

      ${dishes.map((d, i) => `

        <article
          class="dish"
          data-category="${d.category}"
        >

          <div class="dish-art">

            <img
              src="${d.image}"
              alt="${d.name}"
              loading="lazy"
            >

            <span class="dish-number">
              0${i + 1}
            </span>

          </div>


          <h3>
            ${d.name}
          </h3>


          <p class="dish-desc">
            ${d.desc}
          </p>


          <div class="dish-foot">

            <span class="price">
              ${d.price}
            </span>

            <button
              class="btn btn-sm btn-primary order-btn"
              data-dish="${d.name}"
            >
              Đặt ngay
            </button>

          </div>

        </article>

      `).join('')}

    </div>

  </div>

</section>


<!-- =========================
     GIỚI THIỆU
========================= -->

<section id="about" class="about">

  <div class="container about-grid">

    <div class="about-art">

      <div class="about-photo">

        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85"
          alt="Không gian nhà hàng"
        >

      </div>


      <div class="about-stat">

        <span class="about-count">
          12.000+
        </span>

        <span class="about-label">
          Đơn hàng đã giao
        </span>

      </div>


      <div class="about-stat">

        <span class="about-count">
          50+
        </span>

        <span class="about-label">
          Món ăn trong thực đơn
        </span>

      </div>

    </div>


    <div class="about-content">

      <p class="eyebrow">
        Về chúng tôi
      </p>

      <h2>
        Chuẩn vị truyền thống,
        hiện đại trong từng chi tiết
      </h2>

      <p>
        CBM FOOD mang những món ăn thơm ngon,
        đậm đà đến bàn ăn của mọi gia đình.
        Mỗi món ăn đều được kiểm soát chất lượng
        từ nguyên liệu đến khâu trình bày.
      </p>

      <p>
        Đội ngũ đầu bếp luôn đổi mới thực đơn
        theo mùa, đảm bảo sự đa dạng và mới mẻ
        cho khách hàng.
      </p>

      <a href="#menu" class="btn btn-primary">
        Khám phá thực đơn
      </a>

    </div>

  </div>

</section>


<!-- =========================
     LIÊN HỆ
========================= -->

<section id="contact" class="cta">

  <div class="container cta-box">

    <h2>
      Sẵn sàng thưởng thức món ngon?
    </h2>

    <p>
      Đăng nhập để lưu thông tin và đặt món nhanh hơn.
    </p>

    <div class="hero-actions">

      <button
        class="btn btn-light btn-lg"
        data-auth="login"
      >
        Đăng nhập
      </button>

      <button
        class="btn btn-outline-light btn-lg"
        data-auth="register"
      >
        Đăng ký miễn phí
      </button>

    </div>

  </div>

</section>

</main>


<!-- =========================
     FOOTER
========================= -->

<footer class="site-footer">

  <div class="container footer-grid">

    <div class="footer-brand">

      <a href="#" class="brand">

        <span class="brand-mark">
          CBM
        </span>

        <span class="brand-name">
          CBM FOOD
        </span>

      </a>

      <p>
        Đồ ăn ngon, giao nhanh mỗi ngày.
        Cảm ơn bạn đã tin tưởng lựa chọn CBM.
      </p>

    </div>


    <nav class="footer-col">

      <h4>
        Liên kết
      </h4>

      <a href="#home">
        Trang chủ
      </a>

      <a href="#menu">
        Thực đơn
      </a>

      <a href="#about">
        Giới thiệu
      </a>

      <a href="#contact">
        Liên hệ
      </a>

    </nav>


    <div class="footer-col">

      <h4>
        Liên hệ
      </h4>

      <p>
        123 Đường Lê Lợi, Quận 1, TP.HCM
      </p>

      <p>
        Hotline: 1900 1234
      </p>

      <p>
        Email: hotro@cbmfood.vn
      </p>

    </div>


    <div class="footer-col">

      <h4>
        Giờ mở cửa
      </h4>

      <p>
        Thứ 2 - Chủ nhật
      </p>

      <p>
        08:00 - 22:00
      </p>

    </div>

  </div>


  <div class="container footer-bottom">

    <p>
      © 2026 CBM FOOD. All rights reserved.
    </p>

  </div>

</footer>


<!-- =========================
     MODAL ĐĂNG NHẬP / ĐĂNG KÝ
========================= -->

<div
  class="modal-backdrop"
  id="authModal"
  aria-hidden="true"
>

  <div
    class="auth-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="authTitle"
  >

    <button
      class="modal-close"
      id="closeAuth"
      aria-label="Đóng"
    >
      ×
    </button>


    <div class="auth-image">

      <img
        src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
        alt="Món ăn ngon"
      >

    </div>


    <div class="auth-panel">

      <div class="auth-tabs">

        <button
          class="auth-tab active"
          data-tab="login"
        >
          Đăng nhập
        </button>

        <button
          class="auth-tab"
          data-tab="register"
        >
          Đăng ký
        </button>

      </div>


      <p class="eyebrow">
        Chào mừng bạn
      </p>

      <h2 id="authTitle">
        Đăng nhập
      </h2>

      <p class="auth-subtitle">
        Đăng nhập để đặt món nhanh và lưu thông tin của bạn.
      </p>


      <form id="authForm">

        <div class="form-group register-only">

          <label for="fullName">
            Họ và tên
          </label>

          <input
            id="fullName"
            type="text"
            placeholder="Nguyễn Văn A"
          >

        </div>


        <div class="form-group">

          <label for="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="ban@example.com"
            required
          >

        </div>


        <div class="form-group">

          <label for="password">
            Mật khẩu
          </label>

          <div class="password-wrap">

            <input
              id="password"
              type="password"
              placeholder="Ít nhất 6 ký tự"
              required
              minlength="6"
            >

            <button
              type="button"
              id="togglePassword"
            >
              Hiện
            </button>

          </div>

        </div>


        <div class="form-group register-only">

          <label for="confirmPassword">
            Nhập lại mật khẩu
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
          >

        </div>


        <p
          class="form-message"
          id="formMessage"
        ></p>


        <button
          class="btn btn-primary auth-submit"
          type="submit"
          id="authSubmit"
        >
          Đăng nhập
        </button>

      </form>


      <p
        class="switch-auth"
        id="switchAuth"
      >
        Chưa có tài khoản?
        <button
          type="button"
          data-tab="register"
        >
          Đăng ký ngay
        </button>
      </p>

    </div>

  </div>

</div>

`


/* =========================
   AUTH
========================= */

const modal = document.querySelector('#authModal')
const form = document.querySelector('#authForm')
const message = document.querySelector('#formMessage')

let mode = 'login'


// ===============================
// MỞ FORM ĐĂNG NHẬP / ĐĂNG KÝ
// ===============================
function openAuth(nextMode = 'login') {
  mode = nextMode

  modal.classList.add('show')
  modal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')

  setMode(mode)

  setTimeout(() => {
    document.querySelector('#email')?.focus()
  }, 100)
}


// ===============================
// CHUYỂN ĐĂNG NHẬP / ĐĂNG KÝ
// ===============================
function setMode(nextMode) {
  mode = nextMode

  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.classList.toggle(
      'active',
      tab.dataset.tab === mode
    )
  })

  document.querySelectorAll('.register-only').forEach(el => {
    el.classList.toggle(
      'show',
      mode === 'register'
    )
  })

  document.querySelector('#authTitle').textContent =
    mode === 'login'
      ? 'Đăng nhập'
      : 'Tạo tài khoản'

  document.querySelector('.auth-subtitle').textContent =
    mode === 'login'
      ? 'Đăng nhập để đặt món nhanh và lưu thông tin của bạn.'
      : 'Tạo tài khoản miễn phí để đặt món nhanh hơn.'

  document.querySelector('#authSubmit').textContent =
    mode === 'login'
      ? 'Đăng nhập'
      : 'Đăng ký'

  document.querySelector('#switchAuth').innerHTML =
    mode === 'login'
      ? 'Chưa có tài khoản? <button type="button" data-tab="register">Đăng ký ngay</button>'
      : 'Đã có tài khoản? <button type="button" data-tab="login">Đăng nhập</button>'

  message.textContent = ''
}


// ===============================
// ĐÓNG FORM
// ===============================
function closeAuth() {
  modal.classList.remove('show')
  modal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
}


// ===============================
// CẬP NHẬT NÚT ĐĂNG NHẬP / ĐĂNG XUẤT
// ===============================
function updateAuthUI() {
  const currentUser =
    JSON.parse(
      localStorage.getItem('cbmCurrentUser') || 'null'
    )

  const loginButton =
    document.querySelector('.btn-login')

  if (!loginButton) return

  if (currentUser) {

    // Đã đăng nhập
    loginButton.textContent = 'Đăng xuất'
    loginButton.dataset.auth = ''
    loginButton.dataset.logout = 'true'
    loginButton.dataset.loggedIn = 'true'

    loginButton.title =
      `Đang đăng nhập: ${currentUser.name}`

  } else {

    // Chưa đăng nhập
    loginButton.textContent = 'Đăng nhập'
    loginButton.dataset.auth = 'login'
    loginButton.dataset.logout = 'false'
    loginButton.dataset.loggedIn = 'false'

    loginButton.title = 'Đăng nhập'
  }
}


// ===============================
// ĐĂNG XUẤT
// ===============================
function logout() {

  localStorage.removeItem('cbmCurrentUser')

  updateAuthUI()

  alert('Bạn đã đăng xuất thành công!')

  window.location.hash = '#home'
}


// ===============================
// CLICK TOÀN WEBSITE
// ===============================
document.addEventListener('click', event => {

  // -------------------------------
  // ĐĂNG XUẤT
  // -------------------------------
  const logoutButton =
    event.target.closest('[data-logout="true"]')

  if (logoutButton) {
    event.preventDefault()
    logout()
    return
  }


  // -------------------------------
  // ĐĂNG NHẬP / ĐĂNG KÝ
  // -------------------------------
  const authButton =
    event.target.closest('[data-auth]')

  if (
    authButton &&
    authButton.dataset.auth
  ) {
    event.preventDefault()

    openAuth(
      authButton.dataset.auth
    )

    return
  }


  // -------------------------------
  // TAB ĐĂNG NHẬP / ĐĂNG KÝ
  // -------------------------------
  const tabButton =
    event.target.closest('[data-tab]')

  if (tabButton) {
    event.preventDefault()

    setMode(
      tabButton.dataset.tab
    )

    return
  }


  // -------------------------------
  // ĐÓNG FORM
  // -------------------------------
  if (
    event.target.closest('#closeAuth') ||
    event.target === modal
  ) {
    closeAuth()
    return
  }


  // -------------------------------
  // ĐẶT MÓN
  // -------------------------------
  const orderButton =
    event.target.closest('.order-btn')

  if (orderButton) {

    const currentUser =
      JSON.parse(
        localStorage.getItem('cbmCurrentUser') || 'null'
      )

    if (!currentUser) {

      openAuth('login')

      message.textContent =
        `Đăng nhập để đặt ${orderButton.dataset.dish}.`

    } else {

      alert(
        `Xin chào ${currentUser.name}! Bạn đã chọn ${orderButton.dataset.dish}.`
      )

    }
  }
})


// ===============================
// HIỆN / ẨN MẬT KHẨU
// ===============================
document
  .querySelector('#togglePassword')
  ?.addEventListener('click', () => {

    const input =
      document.querySelector('#password')

    if (!input) return

    input.type =
      input.type === 'password'
        ? 'text'
        : 'password'

    document.querySelector(
      '#togglePassword'
    ).textContent =
      input.type === 'password'
        ? 'Hiện'
        : 'Ẩn'
  })


// ===============================
// ĐĂNG KÝ / ĐĂNG NHẬP
// ===============================
form.addEventListener('submit', event => {

  event.preventDefault()

  const email =
    document
      .querySelector('#email')
      .value
      .trim()
      .toLowerCase()

  const password =
    document.querySelector('#password').value

  const name =
    document.querySelector('#fullName')
      .value
      .trim()

  const users =
    JSON.parse(
      localStorage.getItem('cbmUsers') || '{}'
    )


  // =============================
  // ĐĂNG KÝ
  // =============================
  if (mode === 'register') {

    const confirm =
      document.querySelector(
        '#confirmPassword'
      ).value

    if (!name) {
      message.textContent =
        'Vui lòng nhập họ và tên.'
      return
    }

    if (password.length < 6) {
      message.textContent =
        'Mật khẩu phải có ít nhất 6 ký tự.'
      return
    }

    if (password !== confirm) {
      message.textContent =
        'Mật khẩu nhập lại chưa khớp.'
      return
    }

    if (users[email]) {
      message.textContent =
        'Email này đã được đăng ký.'
      return
    }


    users[email] = {
      name: name,
      password: password
    }

    localStorage.setItem(
      'cbmUsers',
      JSON.stringify(users)
    )


    // Chuyển sang đăng nhập
    setMode('login')

    document.querySelector(
      '#email'
    ).value = email

    document.querySelector(
      '#password'
    ).value = ''

    message.textContent =
      'Đăng ký thành công! Hãy đăng nhập.'

    return
  }


  // =============================
  // ĐĂNG NHẬP
  // =============================
  if (!users[email]) {

    message.textContent =
      'Email chưa được đăng ký.'

    return
  }

  if (users[email].password !== password) {

    message.textContent =
      'Mật khẩu không đúng.'

    return
  }


  // Lưu người dùng hiện tại
  localStorage.setItem(
    'cbmCurrentUser',
    JSON.stringify(users[email])
  )


  message.textContent =
    `Xin chào ${users[email].name}! Đăng nhập thành công.`


  // Cập nhật giao diện
  updateAuthUI()


  // Đóng form sau 800ms
  setTimeout(() => {
    closeAuth()
  }, 800)
})


// ===============================
// PHÍM ESC ĐỂ ĐÓNG FORM
// ===============================
document.addEventListener(
  'keydown',
  event => {

    if (
      event.key === 'Escape' &&
      modal.classList.contains('show')
    ) {
      closeAuth()
    }

  }
)


// ===============================
// CHẠY KHI WEBSITE MỞ
// ===============================
updateAuthUI()