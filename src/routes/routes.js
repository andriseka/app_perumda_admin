import AuthController from "../controllers/auth/AuthController";
import DeliveryController from "../controllers/delivery/DeliveryController";
import EmployeeController from "../controllers/employee/EmployeeController";
import FinancialController from "../controllers/financial/FinancialController";
import HomeController from "../controllers/home/HomeController";
import MitraController from "../controllers/mitra/MitraController";
import OperasionalController from "../controllers/operasional/OperasionalController";
import OtherIncomeController from "../controllers/other_income/OtherIncomeController";
import MasterProductController from "../controllers/product/MasterProductController";
import ProductController from "../controllers/product/ProductController";
import SalesController from "../controllers/sales/SalesController";
import ScreenSelectRoleController from "../controllers/screen/ScreenSelectRoleController";
import ScreenWelcomeController from "../controllers/screen/ScreenWelcomeController";
import StoreController from "../controllers/store/StoreController";
import WarehouseController from "../controllers/warehouse/WarehouseController";

const routes = [
    // screen
    {
        path: 'select-role',
        element: ScreenSelectRoleController,
    },
    {
        path: 'welcome-screen',
        element: ScreenWelcomeController,
    },

    {
        path: 'dashboard',
        element: HomeController,
    },

    // employee
    {
        path: 'employee/form',
        element: EmployeeController,
        view: 'form'
    },
    {
        path: 'employee/data',
        element: EmployeeController,
        view: 'data'
    },
    {
        path: 'employee/data/:employee_username',
        element: EmployeeController,
        view: 'data-detail'
    },

    // mitra
    // toko
    {
        path: 'mitra/toko/data',
        element: StoreController,
        view: 'store-data'
    },
    {
        path: 'mitra/toko/form',
        element: StoreController,
        view: 'store-form'
    },
    // supplier
    {
        path: 'mitra/supplier/form',
        element: MitraController,
        view: 'supplier-form'
    },
    {
        path: 'mitra/supplier/data',
        element: MitraController,
        view: 'supplier-data'
    },
    {
        path: 'mitra/supplier/data/:code',
        element: MitraController,
        view: 'supplier-data-detail'
    },

    // marketing
    {
        path: 'mitra/marketing/form',
        element: MitraController,
        view: 'marketing-form'
    },
    {
        path: 'mitra/marketing/data',
        element: MitraController,
        view: 'marketing-data'
    },
    {
        path: 'mitra/marketing/data/:code',
        element: MitraController,
        view: 'marketing-data-detail'
    },

    // master products
    // category
    {
        path: 'product/master/category/form',
        element: MasterProductController,
        view: 'category-form'
    },
    {
        path: 'product/master/category/data',
        element: MasterProductController,
        view: 'category-data'
    },

    // sub category
    {
        path: 'product/master/sub-category/form',
        element: MasterProductController,
        view: 'sub-category-form'
    },
    {
        path: 'product/master/sub-category/data',
        element: MasterProductController,
        view: 'sub-category-data'
    },

    // detail sub category
    {
        path: 'product/master/detail-sub-category/form',
        element: MasterProductController,
        view: 'detail-sub-category-form'
    },
    {
        path: 'product/master/detail-sub-category/data',
        element: MasterProductController,
        view: 'detail-sub-category-data'
    },
    
    // merk
    {
        path: 'product/master/merk/data',
        element: MasterProductController,
        view: 'merk-data'
    },
    {
        path: 'product/master/merk/form',
        element: MasterProductController,
        view: 'merk-form'
    },

    // products
    {
        path: 'product/form',
        element: ProductController,
        view: 'form'
    },
    {
        path: 'product/data',
        element: ProductController,
        view: 'data'
    },
    {
        path: 'product/data/:code',
        element: ProductController,
        view: 'detail'
    },
    {
        path: 'product/setting',
        element: ProductController,
        view: 'setting'
    },

    // warehouse
    // purchase
    {
        path: 'warehouse/purchase/data',
        element: WarehouseController,
        view: 'purchase-data'
    },
    {
        path: 'warehouse/purchase/data/:code',
        element: WarehouseController,
        view: 'purchase-data-detail'
    },
    {
        path: 'warehouse/purchase/form',
        element: WarehouseController,
        view: 'purchase-form'
    },
    {
        path: 'warehouse/purchase/void/data',
        element: WarehouseController,
        view: 'purchase-void-data'
    },

    // purchase tempo
    {
        path: 'warehouse/purchase/tempo/data',
        element: WarehouseController,
        view: 'purchase-tempo-data'
    },
    {
        path: 'warehouse/purchase/tempo/data/:code',
        element: WarehouseController,
        view: 'purchase-tempo-detail'
    },

    // penerimaan
    {
        path: 'warehouse/penerimaan/data',
        element: WarehouseController,
        view: 'penerimaan-data'
    },
    {
        path: 'warehouse/penerimaan/data/:code',
        element: WarehouseController,
        view: 'penerimaan-detail'
    },
    {
        path: 'warehouse/penerimaan/report',
        element: WarehouseController,
        view: 'penerimaan-report'
    },
    {
        path: 'warehouse/penerimaan/report/:code',
        element: WarehouseController,
        view: 'penerimaan-report-detail'
    },

    // stock
    {
        path: 'warehouse/stock',
        element: WarehouseController,
        view: 'stock'
    },

    // spoil
    {
        path: 'warehouse/spoil',
        element: WarehouseController,
        view: 'spoil'
    },
    {
        path: 'warehouse/spoil/:code',
        element: WarehouseController,
        view: 'spoil-detail'
    },

    // opname
    {
        path: 'warehouse/opname/form/:code',
        element: WarehouseController,
        view: 'opname-form'
    },
    {
        path: 'warehouse/opname',
        element: WarehouseController,
        view: 'opname'
    },
    {
        path: 'warehouse/opname/data',
        element: WarehouseController,
        view: 'opname-data'
    },
    {
        path: 'warehouse/opname/validasi/:code',
        element: WarehouseController,
        view: 'opname-validasi'
    },
    {
        path: 'warehouse/opname/:code',
        element: WarehouseController,
        view: 'opname-detail'
    },
    {
        path: 'warehouse/opname/schedule/form',
        element: WarehouseController,
        view: 'opname-jadwal-form'
    },
    {
        path: 'warehouse/opname/terlaksana',
        element: WarehouseController,
        view: 'opname-terlaksana'
    },
    {
        path: 'warehouse/opname/terlaksana/:code',
        element: WarehouseController,
        view: 'opname-terlaksana-validasi'
    },

    // sales
    {
        path: 'sales/form',
        element: SalesController,
        view: 'sales-form'
    },
    {
        path: 'sales/data',
        element: SalesController,
        view: 'sales-data'
    },
    {
        path: 'sales/retur',
        element: SalesController,
        view: 'retur'
    },
    {
        path: 'sales/retur/:code',
        element: SalesController,
        view: 'retur-detail'
    },
    {
        path: 'sales/spoil',
        element: SalesController,
        view: 'spoil'
    },
    {
        path: 'sales/spoil/:code',
        element: SalesController,
        view: 'spoil-detail'
    },

    // delivery
    {
        path: 'delivery/data',
        element: DeliveryController,
        view: 'delivery'
    },
    {
        path: 'delivery/data/:code',
        element: DeliveryController,
        view: 'delivery-detail'
    },
    {
        path: 'delivery/retur',
        element: DeliveryController,
        view: 'retur'
    },
    {
        path: 'delivery/retur/:code',
        element: DeliveryController,
        view: 'retur-detail'
    },
    {
        path: 'delivery/spoil',
        element: DeliveryController,
        view: 'spoil'
    },
    {
        path: 'delivery/spoil/:code',
        element: DeliveryController,
        view: 'spoil-detail'
    },

    // pendapatan lain
    {
        path: 'other-income',
        element: OtherIncomeController,
        view: 'other-income'
    },
    {
        path: 'other-income/:code',
        element: OtherIncomeController,
        view: 'other-income-detail'
    },

    // Operasional
    {
        path: 'operasional/bisnis',
        element: OperasionalController,
        view: 'bisnis'
    },
    {
        path: 'operasional/bisnis/:code',
        element: OperasionalController,
        view: 'bisnis-detail'
    },
    {
        path: 'operasional/non-bisnis/data',
        element: OperasionalController,
        view: 'non-bisnis-data'
    },
    {
        path: 'operasional/non-bisnis/form',
        element: OperasionalController,
        view: 'non-bisnis-form'
    },

    // financial
    {
        path: 'financial/bisnis',
        element: FinancialController,
        view: 'bisnis'
    },
    {
        path: 'financial/penunjang',
        element: FinancialController,
        view: 'penunjang'
    },
    {
        path: 'financial/operasional',
        element: FinancialController,
        view: 'operasional'
    }
];

export default routes;