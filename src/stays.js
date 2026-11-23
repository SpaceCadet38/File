import dalat from './assets/dalat.webp'
import hoian from './assets/hoian.webp'
import sapa from './assets/sapa.webp'

export const stays = [
  {
    id: 'da-lat',
    destination: 'Đà Lạt',
    location: 'Đà Lạt, Lâm Đồng',
    name: 'Nếp Thông',
    type: 'Cabin trong rừng',
    image: dalat,
    alt: 'Cabin gỗ có cửa kính lớn giữa rừng thông Đà Lạt',
    capacity: 2,
    bedrooms: 1,
    price: 1250000,
    summary: 'Một căn cabin ấm cúng giữa rừng thông, có hiên riêng để nhâm nhi cà phê sáng.',
    amenities: ['Hiên riêng', 'Bếp nhỏ', 'Wi-Fi', 'Chỗ đỗ xe'],
  },
  {
    id: 'hoi-an',
    destination: 'Hội An',
    location: 'An Bàng, Hội An',
    name: 'Nếp Biển',
    type: 'Bungalow ven biển',
    image: hoian,
    alt: 'Bungalow mái lá cạnh bãi biển với cây dừa và hoa giấy',
    capacity: 4,
    bedrooms: 2,
    price: 1480000,
    summary: 'Mái lá, bóng dừa và một lối đi bộ ra biển. Vừa đủ cho một cuối tuần bên nhau.',
    amenities: ['Gần bãi biển', 'Điều hòa', 'Bếp nhỏ', 'Wi-Fi'],
  },
  {
    id: 'sa-pa',
    destination: 'Sa Pa',
    location: 'Tả Van, Sa Pa',
    name: 'Nếp Mây',
    type: 'Nhà gỗ trên núi',
    image: sapa,
    alt: 'Hiên nhà gỗ nhìn ra ruộng bậc thang xanh ở Sa Pa',
    capacity: 6,
    bedrooms: 3,
    price: 1750000,
    summary: 'Thức dậy bên thung lũng Mường Hoa và ngắm ruộng bậc thang từ hiên nhà.',
    amenities: ['Tầm nhìn thung lũng', 'Hiên riêng', 'Bếp', 'Wi-Fi'],
  },
]

export const questions = [
  {
    question: 'Giá hiển thị được tính như thế nào?',
    answer: 'Mỗi căn có một mức giá tham khảo theo đêm. Chọn ngày đến và ngày đi để xem tổng giá dự kiến cho kỳ nghỉ.',
  },
  {
    question: 'Tôi có thể đặt phòng qua trang này không?',
    answer: 'Nếp Stay là một concept homestay. Bạn có thể lọc nơi ở, xem tiện nghi và tính giá dự kiến. Trang hiện chưa nhận đặt phòng hoặc thanh toán.',
  },
  {
    question: 'Tôi có thể đi cùng bao nhiêu người?',
    answer: 'Nếp Thông dành cho tối đa 2 khách, Nếp Biển 4 khách và Nếp Mây 6 khách. Bộ lọc số khách sẽ hiển thị các căn phù hợp.',
  },
]
