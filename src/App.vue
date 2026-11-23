<script setup>
import { computed, nextTick, ref } from 'vue'
import {
  BedDouble, CalendarDays, ChevronDown, Compass,
  House, MapPin, Menu, Search, Trees, UsersRound, X,
} from '@lucide/vue'
import hero from './assets/hero.webp'
import { questions, stays } from './stays'

const destination = ref('')
const checkIn = ref('')
const checkOut = ref('')
const guests = ref('')
const filters = ref({ destination: '', guests: 0 })
const mobileMenu = ref(false)
const selectedStay = ref(null)
const dialog = ref(null)
const formError = ref('')

const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
const days = 86_400_000

function dateValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return [year, month, day].join('-')
}

const today = dateValue(new Date())
const earliestCheckout = computed(() => {
  const date = new Date((checkIn.value || today) + 'T12:00:00')
  date.setDate(date.getDate() + 1)
  return dateValue(date)
})

const nights = computed(() => {
  if (!checkIn.value || !checkOut.value) return 0
  return Math.max(0, (Date.parse(checkOut.value) - Date.parse(checkIn.value)) / days)
})
const visibleStays = computed(() => stays.filter((stay) =>
  (!filters.value.destination || stay.id === filters.value.destination)
  && stay.capacity >= filters.value.guests,
))
const filtered = computed(() => Boolean(filters.value.destination || filters.value.guests))

function updateCheckIn() {
  formError.value = ''
  if (checkOut.value && checkOut.value < earliestCheckout.value) checkOut.value = ''
}

function searchStays() {
  if (Boolean(checkIn.value) !== Boolean(checkOut.value)) {
    formError.value = 'Vui lòng chọn cả ngày nhận và trả phòng để tính giá kỳ nghỉ.'
    return
  }

  formError.value = ''
  filters.value = { destination: destination.value, guests: Number(guests.value) }
  const results = document.getElementById('noi-o')
  results.focus({ preventScroll: true })
  results.scrollIntoView({ block: 'start' })
}

function resetSearch() {
  destination.value = ''
  guests.value = ''
  filters.value = { destination: '', guests: 0 }
}

async function openStay(stay) {
  selectedStay.value = stay
  await nextTick()
  dialog.value.showModal()
}

function closeStay() {
  dialog.value.close()
}
</script>

<template>
  <a class="skip-link" href="#main">Đến nội dung chính</a>
  <header class="site-header">
    <div class="wrap nav">
      <a class="brand" href="#" aria-label="Nếp Stay, trang chủ">
        <span class="brand-mark"><House :size="20" :stroke-width="1.8" aria-hidden="true" /></span>
        <span>Nếp<span class="brand-stay"> Stay</span></span>
      </a>
      <button
        class="menu-toggle icon-button" type="button" aria-controls="navigation"
        :aria-expanded="mobileMenu" :aria-label="mobileMenu ? 'Đóng menu' : 'Mở menu'"
        @click="mobileMenu = !mobileMenu"
      >
        <X v-if="mobileMenu" aria-hidden="true" />
        <Menu v-else aria-hidden="true" />
      </button>
      <nav id="navigation" :class="{ open: mobileMenu }" aria-label="Điều hướng chính">
        <a href="#noi-o" @click="mobileMenu = false">Nơi lưu trú</a>
        <a href="#trai-nghiem" @click="mobileMenu = false">Trải nghiệm</a>
        <a href="#cau-hoi" @click="mobileMenu = false">Câu hỏi thường gặp</a>
      </nav>
      <a class="button header-cta" href="#tim-cho-o">Tìm chỗ ở</a>
    </div>
  </header>

  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <img class="hero-photo" :src="hero" alt="" fetchpriority="high" />
      <div class="wrap hero-content">
        <div class="hero-kicker"><span></span> HOMESTAY GẦN THIÊN NHIÊN</div>
        <h1 id="hero-title">Đi một chuyến.<br /><em>Sống chậm lại.</em></h1>
        <p>Từ rừng thông Đà Lạt đến biển Hội An và ruộng bậc thang Sa Pa, tìm một căn nhà nhỏ cho kỳ nghỉ theo nhịp của riêng bạn.</p>
        <a class="button hero-cta" href="#noi-o">Khám phá homestay</a>
      </div>
      <div class="wrap hero-location">
        <span><MapPin :size="15" aria-hidden="true" /> Rừng thông Đà Lạt</span>
      </div>
    </section>

    <div id="tim-cho-o" class="wrap search-wrap">
      <form class="search-panel" aria-label="Tìm homestay" @submit.prevent="searchStays">
        <label class="field">
          <MapPin :size="20" aria-hidden="true" />
          <span><span class="field-label">Điểm đến</span>
            <select v-model="destination">
              <option value="">Mọi điểm đến</option>
              <option v-for="stay in stays" :key="stay.id" :value="stay.id">{{ stay.destination }}</option>
            </select>
          </span>
          <ChevronDown class="select-icon" :size="15" aria-hidden="true" />
        </label>
        <label class="field">
          <CalendarDays :size="20" aria-hidden="true" />
          <span><span class="field-label">Nhận phòng</span>
            <input v-model="checkIn" type="date" :min="today" @change="updateCheckIn" />
          </span>
        </label>
        <label class="field">
          <CalendarDays :size="20" aria-hidden="true" />
          <span><span class="field-label">Trả phòng</span>
            <input v-model="checkOut" type="date" :min="earliestCheckout" @change="formError = ''" />
          </span>
        </label>
        <label class="field">
          <UsersRound :size="20" aria-hidden="true" />
          <span><span class="field-label">Số khách</span>
            <select v-model="guests">
              <option value="">Mọi quy mô</option>
              <option v-for="count in 6" :key="count" :value="count">{{ count }} khách</option>
            </select>
          </span>
          <ChevronDown class="select-icon" :size="15" aria-hidden="true" />
        </label>
        <button class="button search-button" type="submit"><Search :size="18" aria-hidden="true" /> Tìm homestay</button>
        <p v-if="formError" class="form-error" role="alert">{{ formError }}</p>
      </form>
    </div>

    <section id="noi-o" class="wrap stays-section" tabindex="-1" aria-labelledby="stays-title">
      <div class="section-head">
        <div>
          <p class="eyebrow">BỘ SƯU TẬP NẾP STAY</p>
          <h2 id="stays-title">Chọn một nơi để trốn phố</h2>
        </div>
        <p>Ba điểm đến, ba kiểu nghỉ. Chọn căn nhà hợp với kỳ nghỉ của bạn.</p>
      </div>
      <div v-if="filtered || nights" class="results-summary" aria-live="polite">
        <span>{{ visibleStays.length }} nơi lưu trú{{ nights ? ' · ' + nights + ' đêm, giá tham khảo' : '' }}</span>
        <button v-if="filtered" class="text-button" type="button" @click="resetSearch">Xóa bộ lọc</button>
      </div>
      <div v-if="visibleStays.length" class="stay-grid">
        <article v-for="stay in visibleStays" :key="stay.id" class="stay-card">
          <div class="stay-photo">
            <img :src="stay.image" :alt="stay.alt" loading="lazy" width="510" height="421" />
            <span>{{ stay.type }}</span>
          </div>
          <div class="stay-content">
            <p class="location"><MapPin :size="15" aria-hidden="true" /> {{ stay.location }}</p>
            <h3>{{ stay.name }}</h3>
            <p class="stay-description">{{ stay.summary }}</p>
            <div class="stay-facts">
              <span><UsersRound :size="16" aria-hidden="true" /> Tối đa {{ stay.capacity }} khách</span>
              <span><BedDouble :size="16" aria-hidden="true" /> {{ stay.bedrooms }} phòng ngủ</span>
            </div>
            <div class="card-footer">
              <div><strong>{{ money.format(stay.price) }}</strong><span> / đêm</span></div>
              <button class="text-button" type="button" :aria-label="'Xem chi tiết ' + stay.name" @click="openStay(stay)">Xem chi tiết</button>
            </div>
          </div>
        </article>
      </div>
      <div v-else class="empty-state">Điểm đến này chưa có căn đủ chỗ cho nhóm của bạn. Hãy chọn điểm đến khác hoặc giảm số khách.</div>
      <p class="demo-note">Hình ảnh, căn lưu trú và mức giá trên trang được minh họa cho concept Nếp Stay.</p>
    </section>

    <section id="trai-nghiem" class="experience">
      <div class="wrap experience-layout">
        <div>
          <p class="eyebrow">TRẢI NGHIỆM TẠI NẾP</p>
          <h2>Một ngày theo nhịp của bạn</h2>
          <p>Dành buổi sáng ngoài hiên, buổi chiều khám phá xung quanh và buổi tối quây quần trong căn nhà riêng.</p>
        </div>
        <div class="experience-list">
          <div><Trees :size="24" aria-hidden="true" /><div><h3>Gần thiên nhiên</h3><p>Đi bộ dưới tán thông, ra biển sớm hoặc dạo quanh ruộng bậc thang.</p></div></div>
          <div><House :size="24" aria-hidden="true" /><div><h3>Không gian riêng</h3><p>Chọn cabin cho hai người hoặc căn nhà đủ chỗ cho cả nhóm.</p></div></div>
          <div><Compass :size="24" aria-hidden="true" /><div><h3>Khám phá quanh nhà</h3><p>Mỗi điểm đến có một nhịp sống riêng để bạn tự lên lịch khám phá.</p></div></div>
        </div>
      </div>
    </section>

    <section id="cau-hoi" class="wrap faq" aria-labelledby="faq-title">
      <div>
        <p class="eyebrow">LÊN KẾ HOẠCH</p>
        <h2 id="faq-title">Câu hỏi thường gặp</h2>
      </div>
      <div>
        <details v-for="item in questions" :key="item.question">
          <summary>{{ item.question }} <ChevronDown :size="18" aria-hidden="true" /></summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-inner">
      <a class="brand" href="#"><span class="brand-mark"><House :size="20" aria-hidden="true" /></span> <span>Nếp<span class="brand-stay"> Stay</span></span></a>
      <p>Concept homestay Việt Nam</p>
      <a href="#tim-cho-o">Tìm chỗ ở</a>
    </div>
  </footer>

  <dialog ref="dialog" class="stay-dialog" aria-labelledby="dialog-title" @close="selectedStay = null" @click.self="closeStay">
    <article v-if="selectedStay">
      <button type="button" class="icon-button dialog-close" aria-label="Đóng chi tiết" @click="closeStay"><X aria-hidden="true" /></button>
      <img :src="selectedStay.image" :alt="selectedStay.alt" width="510" height="421" />
      <div class="dialog-content">
        <p class="location"><MapPin :size="15" aria-hidden="true" /> {{ selectedStay.location }}</p>
        <h2 id="dialog-title">{{ selectedStay.name }}</h2>
        <p>{{ selectedStay.summary }}</p>
        <p>Tối đa {{ selectedStay.capacity }} khách · {{ selectedStay.bedrooms }} phòng ngủ</p>
        <h3>Tiện nghi</h3>
        <ul class="amenities"><li v-for="amenity in selectedStay.amenities" :key="amenity">{{ amenity }}</li></ul>
        <p v-if="nights" class="price-total">{{ nights }} đêm · <strong>{{ money.format(selectedStay.price * nights) }}</strong> dự kiến</p>
        <p v-else class="price-total"><strong>{{ money.format(selectedStay.price) }}</strong> / đêm tham khảo</p>
      </div>
    </article>
  </dialog>
</template>
