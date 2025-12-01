
export interface TallyEntry {
  id: string;
  containerNo: string; // Số Container
  sealNo: string;      // Số Chì
  sizeType: string;    // Kích cỡ (ISO)
  fe: string;          // Full/Empty (F/E)
  location: string;    // Vị trí
  remark: string;      // Ghi chú
  selected?: boolean;  // Selection state
}

export interface GeneralCargoEntry {
  id: string;
  blNo: string;        // Số BL
  orderNo: string;     // Số lệnh
  description: string; // Loại hàng
  // Array of quantity pairs to represent columns like (PKgs/pcs | Rời) repeated
  quantities: { pkgs: string; loose: string }[]; 
  total: string;       // Cộng
  grossWeight: string; // Khối lượng
}

export interface TruckEntry {
  id: string;
  truckNo: string;     // Số xe
  trailerNo: string;   // Số mooc
  description: string; // Loại hàng
  quantities: string[]; // Array of strings for quantity columns (e.g., "10/0/5")
  total: string;       // Cộng
  grossWeight: string; // Khối lượng
}

export interface TruckGenEntry {
  id: string;
  truckNo: string;     // Số xe
  trailerNo: string;   // Số mooc
  description: string; // Loại hàng
  quantities: { pkgs: string; loose: string }[]; // Complex quantities like General Cargo
  total: string;       // Cộng
  grossWeight: string; // Khối lượng
}

export interface BargeDeliveryEntry {
  id: string;
  blNo: string;        // Số BL
  orderNo: string;     // Số lệnh
  description: string; // Loại hàng
  quantities: string[]; // Array of strings (simple quantity columns)
  total: string;       // Cộng
  grossWeight: string; // Khối lượng
}

export interface WarehouseEntry {
  id: string;
  yardLocation: string; // Vị trí bãi
  orderNo: string;      // Số lệnh
  truckNo: string;      // Số xe
  trailerNo: string;    // Số mooc
  method: string;       // Cách thức
  packages: string;     // Kiện
  weight: string;       // Trọng lượng
  psc: string;          // Psc
  loose: string;        // Rời
  condition: string;    // Tình trạng hàng hóa
}