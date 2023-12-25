import { AttachMoney, BarChart, Description, GridView, Handshake, LocalGroceryStore, LocalShipping, MilitaryTech, Payment, People, Speed, StackedLineChart, Warehouse } from "@mui/icons-material";

const _sidebar = [
    {
        name: 'Dashboard',
        icon: GridView,
        to: 'dashboard',
        active: 'dashboard'
    },
    {
        name: 'Karyawan',
        icon: People,
        to: 'employee/form',
        active: 'employee'
    },
    {
        name: 'Mitra',
        icon: Handshake,
        to: 'mitra/supplier/form',
        active: 'mitra'
    },
    {
        name: 'Produk',
        icon: LocalGroceryStore,
        to: 'product/form',
        active: 'product'
    },
    {
        name: 'Pergudangan',
        icon: Warehouse,
        to: 'warehouse/purchase/data',
        active: 'warehouse'
    },
    {
        name: 'Penjualan',
        icon: AttachMoney,
        to: 'sales/data',
        active: 'sales'
    },
    {
        name: 'Pengiriman',
        icon: LocalShipping,
        to: 'delivery/data',
        active: 'delivery'
    },
    {
        name: 'Pendapatan Lain',
        icon: StackedLineChart,
        to: 'other-income',
        active: 'other-income'
    },
    {
        name: 'Operasional',
        icon: BarChart,
        to: 'operasional/bisnis',
        active: 'operasional'
    },
    {
        name: 'Financial',
        icon: Payment,
        to: 'financial/bisnis'
    },
    {
        name: 'RKAP',
        icon: Description,
        to: '/rkap'
    },
    {
        name: 'KPI',
        icon: Speed,
        to: '/kpi'
    },
    {
        name: 'Jaminan Mutu',
        icon: MilitaryTech,
        to: '/jaminan-mutu'
    }
]

export default _sidebar;