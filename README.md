# 🍽️ Restaurant REST API

Project UTS Backend Programming - Genap 2025/2026  
**Stack:** Node.js + Express + MongoDB (Mongoose)

---

## 📁 Struktur Folder

```
restaurant-api/
├── config/
│   └── db.js               # Koneksi MongoDB
├── models/
│   ├── Menu.js
│   ├── Order.js
│   ├── Table.js
│   ├── Category.js
│   └── Customer.js
├── controllers/
│   ├── menuController.js
│   ├── orderController.js
│   ├── tableController.js
│   ├── categoryController.js
│   └── customerController.js
├── routes/
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   ├── tableRoutes.js
│   ├── categoryRoutes.js
│   └── customerRoutes.js
├── .env.example
├── package.json
└── server.js
```

---

## ⚙️ Cara Install & Jalankan

### 1. Clone repo & install dependencies
```bash
git clone <url-repo>
cd restaurant-api
npm install
```

### 2. Setup environment variable
```bash
cp .env.example .env
```
Edit file `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/restaurant_db
```
> Atau pakai MongoDB Atlas, ganti MONGODB_URI dengan connection string dari Atlas.

### 3. Jalankan server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server berjalan di: `http://localhost:3000`

---

## 📋 Pembagian Endpoint per Anggota

| Anggota | Resource | Method | Endpoint | Deskripsi |
|---------|----------|--------|----------|-----------|
| **Anggota 1** | Menu | GET | `/api/menu` | Ambil semua menu |
| **Anggota 1** | Menu | POST | `/api/menu` | Tambah menu baru |
| **Anggota 2** | Menu | GET | `/api/menu/:id` | Ambil menu by ID |
| **Anggota 2** | Menu | PUT | `/api/menu/:id` | Update menu |
| **Anggota 3** | Order | GET | `/api/orders` | Ambil semua order |
| **Anggota 3** | Order | POST | `/api/orders` | Buat order baru |
| **Anggota 4** | Order | GET | `/api/orders/:id` | Ambil order by ID |
| **Anggota 4** | Order | PATCH | `/api/orders/:id/status` | Update status order |
| **Anggota 5** | Table | GET | `/api/tables` | Ambil semua meja |
| **Anggota 5** | Table | POST | `/api/tables` | Tambah meja baru |

> Total: **10 endpoint** (masing-masing anggota 2 endpoint) ✅

---

## 🔌 API Documentation

### BASE URL
```
http://localhost:3000/api
```

---

### 🥘 MENU

#### GET /api/menu
Ambil semua menu. Bisa filter pakai query params.

**Query Params (opsional):**
- `available=true` → filter menu yang tersedia
- `category=<categoryId>` → filter by kategori

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "Nasi Goreng",
      "description": "Nasi goreng spesial",
      "price": 25000,
      "category": { "_id": "...", "name": "Makanan" },
      "is_available": true,
      "stock": 50
    }
  ]
}
```

#### POST /api/menu
Tambah menu baru.

**Request Body:**
```json
{
  "name": "Nasi Goreng",
  "description": "Nasi goreng spesial bumbu rahasia",
  "price": 25000,
  "category": "<categoryId>",
  "is_available": true,
  "stock": 50
}
```

#### GET /api/menu/:id
Ambil detail menu berdasarkan ID.

#### PUT /api/menu/:id
Update data menu.

**Request Body:** (field yang mau diupdate)
```json
{
  "price": 30000,
  "is_available": false
}
```

---

### 📦 ORDER

#### GET /api/orders
Ambil semua order.

**Query Params (opsional):**
- `status=pending|processing|served|paid|cancelled`

#### POST /api/orders
Buat order baru.

**Request Body:**
```json
{
  "customer": "<customerId>",
  "table": "<tableId>",
  "items": [
    { "menu": "<menuId>", "quantity": 2 },
    { "menu": "<menuId>", "quantity": 1 }
  ],
  "notes": "Tidak pakai pedas"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order berhasil dibuat",
  "data": {
    "_id": "...",
    "customer": { "name": "Budi", "phone": "08xx" },
    "items": [...],
    "total_price": 75000,
    "status": "pending"
  }
}
```

#### GET /api/orders/:id
Ambil detail order berdasarkan ID.

#### PATCH /api/orders/:id/status
Update status order.

**Request Body:**
```json
{
  "status": "processing"
}
```
Status yang valid: `pending`, `processing`, `served`, `paid`, `cancelled`

---

### 🪑 TABLE (MEJA)

#### GET /api/tables
Ambil semua meja.

**Query Params (opsional):**
- `status=available|occupied|reserved`
- `location=indoor|outdoor|vip`

#### POST /api/tables
Tambah meja baru.

**Request Body:**
```json
{
  "table_number": 1,
  "capacity": 4,
  "status": "available",
  "location": "indoor"
}
```

---

### 🏷️ CATEGORY

#### GET /api/categories
Ambil semua kategori.

#### POST /api/categories
**Request Body:**
```json
{
  "name": "Makanan",
  "description": "Menu makanan berat"
}
```

---

### 👤 CUSTOMER

#### GET /api/customers
Ambil semua customer.

#### POST /api/customers
**Request Body:**
```json
{
  "name": "Budi Santoso",
  "phone": "081234567890",
  "email": "budi@email.com",
  "address": "Jl. Merdeka No. 1"
}
```

#### GET /api/customers/:id
Ambil customer by ID.

#### PUT /api/customers/:id
Update data customer.

---

## 🧪 Contoh Test dengan Postman / Thunder Client

### Langkah urutan testing:
1. **POST** `/api/categories` → buat kategori dulu
2. **POST** `/api/menu` → buat menu (pakai categoryId dari step 1)
3. **POST** `/api/tables` → buat meja
4. **POST** `/api/customers` → buat customer
5. **POST** `/api/orders` → buat order (pakai id dari step 2, 3, 4)
6. **PATCH** `/api/orders/:id/status` → update status order

---

## 👥 Catatan untuk Tiap Anggota

Pastikan setiap anggota melakukan commit dan push **dari akun GitHub masing-masing** agar kontribusi tercatat. Jangan commit dari 1 akun saja!

```bash
git add .
git commit -m "feat: tambah endpoint GET dan POST menu (Anggota 1)"
git push origin main
```
