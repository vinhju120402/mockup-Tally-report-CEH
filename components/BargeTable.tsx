
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { CheckCircle2, XCircle, FileDown, Filter, RefreshCw, Printer } from 'lucide-react';
import { TallyEntry, GeneralCargoEntry, TruckEntry, BargeDeliveryEntry, TruckGenEntry, WarehouseEntry } from '../types';

const INITIAL_DATA: TallyEntry[] = [
  { id: '1', containerNo: 'TRHU 123456-7', sealNo: 'VN-102938', sizeType: '20DC', fe: 'F', location: 'A-01-02', remark: '', selected: false },
  { id: '2', containerNo: 'MSKU 987654-3', sealNo: 'VN-556677', sizeType: '40HC', fe: 'E', location: 'B-05-01', remark: 'Móp nhẹ', selected: false },
  { id: '3', containerNo: 'SUDU 555666-1', sealNo: 'VN-998822', sizeType: '45GP', fe: 'F', location: 'C-02-03', remark: '', selected: false },
  { id: '4', containerNo: 'TCLU 112233-4', sealNo: 'VN-112233', sizeType: '20DC', fe: 'F', location: 'A-04-06', remark: '', selected: false },
];

const EMPTY_GENERAL_DATA: GeneralCargoEntry[] = [
  { 
    id: '1', 
    blNo: '', 
    orderNo: '', 
    description: '', 
    quantities: [
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  },
  { 
    id: '2', 
    blNo: '', 
    orderNo: '', 
    description: '', 
    quantities: [
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  },
   { 
    id: '3', 
    blNo: '', 
    orderNo: '', 
    description: '', 
    quantities: [
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  }
];

const INITIAL_TRUCK_DATA: TruckEntry[] = [
  {
    id: '1',
    truckNo: '51H45345',
    trailerNo: '51R45488',
    description: 'Sắt thép',
    quantities: ['10/0/5', '10/0/0', '1/0/0', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  },
  {
    id: '2',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: ['', '', '', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  },
  {
    id: '3',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: ['', '', '', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  }
];

const EMPTY_TRUCK_DATA: TruckEntry[] = [
  {
    id: '1',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: ['', '', '', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  },
  {
    id: '2',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: ['', '', '', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  },
  {
    id: '3',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: ['', '', '', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  }
];

const INITIAL_TRUCK_GEN_DATA: TruckGenEntry[] = [
  {
    id: '1',
    truckNo: '51H45345',
    trailerNo: '51R45488',
    description: 'Sắt thép',
    quantities: [
      { pkgs: '9/18', loose: '2' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  },
  {
    id: '2',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: [
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  },
  {
    id: '3',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: [
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  }
];

const INITIAL_IMPORT_DATA: TruckGenEntry[] = [
  {
    id: '1',
    truckNo: 'CP12',
    trailerNo: 'RM12',
    description: 'Sắt thép',
    quantities: [
      { pkgs: '9/18', loose: '2' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  },
  {
    id: '2',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: [
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  },
  {
    id: '3',
    truckNo: '',
    trailerNo: '',
    description: '',
    quantities: [
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' },
      { pkgs: '', loose: '' }
    ],
    total: '',
    grossWeight: ''
  }
];

const INITIAL_BARGE_DELIVERY_DATA: BargeDeliveryEntry[] = [
  {
    id: '1',
    blNo: '',
    orderNo: '',
    description: '',
    quantities: ['', '', '', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  },
  {
    id: '2',
    blNo: '',
    orderNo: '',
    description: '',
    quantities: ['', '', '', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  },
  {
    id: '3',
    blNo: '',
    orderNo: '',
    description: '',
    quantities: ['', '', '', '', '', '', '', ''],
    total: '',
    grossWeight: ''
  }
];

const INITIAL_WAREHOUSE_DATA: WarehouseEntry[] = [
  { id: '1', yardLocation: '', orderNo: '', truckNo: '', trailerNo: '', method: '', packages: '', weight: '', psc: '', loose: '', condition: '' },
  { id: '2', yardLocation: '', orderNo: '', truckNo: '', trailerNo: '', method: '', packages: '', weight: '', psc: '', loose: '', condition: '' },
  { id: '3', yardLocation: '', orderNo: '', truckNo: '', trailerNo: '', method: '', packages: '', weight: '', psc: '', loose: '', condition: '' },
  { id: '4', yardLocation: '', orderNo: '', truckNo: '', trailerNo: '', method: '', packages: '', weight: '', psc: '', loose: '', condition: '' },
];


const REPORT_TEMPLATES = [
  { id: 'report-2', name: 'Hàng kiện giao sà lan' },
  { id: 'report-3', name: 'Hàng thiết bị giao sà lan' },
  { id: 'report-4', name: 'Kiện NGTH xe' },
  { id: 'report-5', name: 'Hàng thiết bị nhập bãi' },
  { id: 'report-6', name: 'Kiện trên tờ NGTH' },
  { id: 'report-7', name: 'Hàng thiết bị NGTH' },
  { id: 'report-8', name: 'Kiện nhập bãi' },
  { id: 'report-9', name: 'Kiện trên tờ nhập bãi' },
  { id: 'report-10', name: 'Kho' },
  { id: 'report-11', name: 'Hàng kiện trên tờ bãi - sà lan' },
  { id: 'report-12', name: 'Kiện trên tờ tàu - sà lan' },
];

const FILTER_VESSELS = ["KMTC KEELUNG / 2405S", "MSC ADONIS / 123N", "EVER GIVEN / 999E"];
const FILTER_BARGES = ["SG 1234", "LA 5678", "VL 9999", "TV 1111"];
const FILTER_METHODS = ["Chọn tất cả", "Nhập bãi", "Giao hàng", "Giao thẳng"];
const FILTER_DIRECTIONS = ["Hàng Nhập", "Hàng Xuất"];
const FILTER_ORDER_NOS = ["ORD-2024-001", "ORD-2024-002", "ORD-2024-003", "ORD-2024-004"];

const BargeTable: React.FC = () => {
  const [entries, setEntries] = useState<TallyEntry[]>(INITIAL_DATA);
  const [generalEntries, setGeneralEntries] = useState<GeneralCargoEntry[]>(EMPTY_GENERAL_DATA);
  const [truckEntries, setTruckEntries] = useState<TruckEntry[]>(INITIAL_TRUCK_DATA);
  const [truckGenEntries, setTruckGenEntries] = useState<TruckGenEntry[]>(INITIAL_TRUCK_GEN_DATA);
  const [bargeDeliveryEntries, setBargeDeliveryEntries] = useState<BargeDeliveryEntry[]>(INITIAL_BARGE_DELIVERY_DATA);
  const [warehouseEntries, setWarehouseEntries] = useState<WarehouseEntry[]>(INITIAL_WAREHOUSE_DATA);
  
  // Initial state is empty string to act as placeholder
  const [selectedReport, setSelectedReport] = useState('');

  // New Filter States
  const [filterVessel, setFilterVessel] = useState('');
  const [filterBarge, setFilterBarge] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [filterDirection, setFilterDirection] = useState('');
  const [filterOrderNo, setFilterOrderNo] = useState('');

  // Conditional Logic for showing Order Number: Only show if Vessel is selected AND Method is 'Giao hàng'
  const showOrderNoFilter = filterVessel !== '' && filterMethod === 'Giao hàng';

  // Check if all filters are selected
  // If showOrderNoFilter is true, we also check filterOrderNo
  const areAllFiltersSelected = 
    filterVessel !== '' && 
    filterBarge !== '' && 
    filterMethod !== '' && 
    filterDirection !== '' && 
    (!showOrderNoFilter || filterOrderNo !== '');

  // Derived state for visible reports based on method
  const visibleReports = useMemo(() => {
    if (filterMethod === 'Nhập bãi') {
      const targetIds = ['report-9', 'report-8', 'report-5'];
      return targetIds.map(id => REPORT_TEMPLATES.find(t => t.id === id)).filter((t): t is {id: string, name: string} => !!t);
    }
    if (filterMethod === 'Giao hàng') {
      const targetIds = ['report-12', 'report-11'];
      return targetIds.map(id => REPORT_TEMPLATES.find(t => t.id === id)).filter((t): t is {id: string, name: string} => !!t);
    }
    if (filterMethod === 'Giao thẳng') {
      // Exclude reports from Nhập bãi and Giao hàng
      const excludedIds = ['report-9', 'report-8', 'report-5', 'report-12', 'report-11'];
      return REPORT_TEMPLATES.filter(t => !excludedIds.includes(t.id));
    }
    return REPORT_TEMPLATES;
  }, [filterMethod]);

  // Logic for report types
  const isGeneralCargoReport = ['report-11', 'report-12'].includes(selectedReport);
  const isBargeDeliveryReport = ['report-2', 'report-3'].includes(selectedReport);
  // Report 7 now uses the Truck layout (simple columns) instead of TruckGen layout
  const isTruckReport = ['report-4', 'report-5', 'report-7'].includes(selectedReport);
  // Report 9 uses the TruckGen layout
  const isTruckGenReport = ['report-6', 'report-8', 'report-9'].includes(selectedReport);
  const isWarehouseReport = selectedReport === 'report-10';
  const isContainerReport = !isGeneralCargoReport && !isTruckReport && !isBargeDeliveryReport && !isTruckGenReport && !isWarehouseReport;

  // Effect to sync selected report if it becomes invalid due to filtering
  useEffect(() => {
    if (selectedReport === '') return; // Allow placeholder state
    const isCurrentValid = visibleReports.some(r => r.id === selectedReport);
    if (!isCurrentValid && visibleReports.length > 0) {
      setSelectedReport(visibleReports[0].id);
    }
  }, [visibleReports, selectedReport]);

  // Reset Order No if condition fails
  useEffect(() => {
    if (!showOrderNoFilter) {
      setFilterOrderNo('');
    }
  }, [showOrderNoFilter]);

  // Effect to switch mock data based on report type
  useEffect(() => {
    if (['report-11', 'report-12'].includes(selectedReport)) {
      // New reports using General Cargo structure but empty data
      setGeneralEntries(JSON.parse(JSON.stringify(EMPTY_GENERAL_DATA)));
    } else if (['report-2', 'report-3'].includes(selectedReport)) {
       // Report 2 and 3 use Barge Delivery structure and start empty
       setBargeDeliveryEntries(JSON.parse(JSON.stringify(INITIAL_BARGE_DELIVERY_DATA)));
    } else if (selectedReport === 'report-6') {
      setTruckGenEntries(JSON.parse(JSON.stringify(INITIAL_TRUCK_GEN_DATA)));
    } else if (selectedReport === 'report-7') {
      // Report 7 uses Truck structure but starts empty
      setTruckEntries(JSON.parse(JSON.stringify(EMPTY_TRUCK_DATA)));
    } else if (selectedReport === 'report-8' || selectedReport === 'report-9') {
      setTruckGenEntries(JSON.parse(JSON.stringify(INITIAL_IMPORT_DATA)));
    } else if (selectedReport === 'report-10') {
      setWarehouseEntries(JSON.parse(JSON.stringify(INITIAL_WAREHOUSE_DATA)));
    }
  }, [selectedReport]);

  const handleInputChange = useCallback((id: string, field: keyof TallyEntry, value: string | boolean) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return { ...entry, [field]: value };
      }
      return entry;
    }));
  }, []);

  const handleGeneralInputChange = useCallback((id: string, field: keyof GeneralCargoEntry, value: string) => {
     setGeneralEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return { ...entry, [field]: value };
      }
      return entry;
    }));
  }, []);
  
  const handleQuantityChange = useCallback((id: string, index: number, subField: 'pkgs' | 'loose', value: string) => {
    setGeneralEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        const newQuantities = [...entry.quantities];
        newQuantities[index] = { ...newQuantities[index], [subField]: value };
        return { ...entry, quantities: newQuantities };
      }
      return entry;
    }));
  }, []);

  const handleTruckInputChange = useCallback((id: string, field: keyof TruckEntry, value: string) => {
    setTruckEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return { ...entry, [field]: value };
      }
      return entry;
    }));
  }, []);

  const handleTruckQuantityChange = useCallback((id: string, index: number, value: string) => {
    setTruckEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        const newQuantities = [...entry.quantities];
        newQuantities[index] = value;
        return { ...entry, quantities: newQuantities };
      }
      return entry;
    }));
  }, []);

  const handleTruckGenInputChange = useCallback((id: string, field: keyof TruckGenEntry, value: string) => {
    setTruckGenEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return { ...entry, [field]: value };
      }
      return entry;
    }));
  }, []);

  const handleTruckGenQuantityChange = useCallback((id: string, index: number, subField: 'pkgs' | 'loose', value: string) => {
    setTruckGenEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        const newQuantities = [...entry.quantities];
        newQuantities[index] = { ...newQuantities[index], [subField]: value };
        return { ...entry, quantities: newQuantities };
      }
      return entry;
    }));
  }, []);

  const handleBargeDeliveryInputChange = useCallback((id: string, field: keyof BargeDeliveryEntry, value: string) => {
    setBargeDeliveryEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return { ...entry, [field]: value };
      }
      return entry;
    }));
  }, []);

  const handleBargeDeliveryQuantityChange = useCallback((id: string, index: number, value: string) => {
    setBargeDeliveryEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        const newQuantities = [...entry.quantities];
        newQuantities[index] = value;
        return { ...entry, quantities: newQuantities };
      }
      return entry;
    }));
  }, []);

  const handleWarehouseInputChange = useCallback((id: string, field: keyof WarehouseEntry, value: string) => {
    setWarehouseEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return { ...entry, [field]: value };
      }
      return entry;
    }));
  }, []);


  const toggleSelection = useCallback((id: string) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return { ...entry, selected: !entry.selected };
      }
      return entry;
    }));
  }, []);

  const selectAll = useCallback(() => {
    setEntries(prev => prev.map(entry => ({ ...entry, selected: true })));
  }, []);

  const deselectAll = useCallback(() => {
    setEntries(prev => prev.map(entry => ({ ...entry, selected: false })));
  }, []);

  const handleExportExcel = () => {
    if (isGeneralCargoReport || isTruckReport || isBargeDeliveryReport || isTruckGenReport || isWarehouseReport) {
      alert("Chức năng xuất Excel cho mẫu báo cáo này đang được phát triển.");
      return;
    }

    // Basic CSV Export implementation for Container Tally
    const headers = ["STT", "Số Container", "Số Chì", "ISO", "F/E", "Vị trí", "Ghi chú"];
    const csvContent = [
      headers.join(","),
      ...entries.map((entry, index) => [
        index + 1,
        entry.containerNo,
        entry.sealNo,
        entry.sizeType,
        entry.fe,
        entry.location,
        `"${entry.remark}"` 
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `tally_report_${selectedReport}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 min-h-[600px] flex flex-col">
      {/* Toolbar */}
      <div className="p-4 space-y-4">
        
        {/* New Filters Section */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-gray-100 ${showOrderNoFilter ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
           {/* Filter 1: Vessel */}
           <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tàu/chuyến</label>
              <div className="relative">
                <select 
                  value={filterVessel}
                  onChange={(e) => setFilterVessel(e.target.value)}
                  className="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400 appearance-none bg-white text-gray-700"
                >
                  <option value="">-- Chọn Tàu/chuyến --</option>
                  {FILTER_VESSELS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <Filter className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
           </div>

           {/* Filter 2: Barge */}
           <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sà lan</label>
              <div className="relative">
                <select 
                  value={filterBarge}
                  onChange={(e) => setFilterBarge(e.target.value)}
                  className="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400 appearance-none bg-white text-gray-700"
                >
                   <option value="">-- Chọn Sà lan --</option>
                   {FILTER_BARGES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <Filter className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
           </div>

           {/* Filter 3: Method */}
           <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phương án</label>
              <div className="relative">
                <select 
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400 appearance-none bg-white text-gray-700"
                >
                   <option value="">-- Chọn Phương án --</option>
                   {FILTER_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <Filter className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
           </div>

           {/* Filter Conditional: Order No - Only visible when Vessel selected AND Method is 'Giao hàng' */}
           {showOrderNoFilter && (
            <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Số lệnh</label>
                <div className="relative">
                  <select 
                    value={filterOrderNo}
                    onChange={(e) => setFilterOrderNo(e.target.value)}
                    className="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400 appearance-none bg-white text-gray-700"
                  >
                    <option value="">-- Chọn Số lệnh --</option>
                    {FILTER_ORDER_NOS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <Filter className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
            </div>
           )}

           {/* Filter 4: Direction */}
           <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hàng Nhập/Xuất</label>
              <div className="relative">
                <select 
                  value={filterDirection}
                  onChange={(e) => setFilterDirection(e.target.value)}
                  className="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400 appearance-none bg-white text-gray-700"
                >
                   <option value="">-- Chọn Hàng Nhập/Xuất --</option>
                   {FILTER_DIRECTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <Filter className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
           </div>
        </div>

        {/* Top Controls: Actions only now */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex flex-row gap-3 w-full md:w-auto md:ml-auto justify-end items-end">
             <div className="flex flex-col gap-1">
               <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mẫu báo cáo</label>
               <div className="flex items-center gap-2">
                 <select 
                   value={selectedReport}
                   onChange={(e) => setSelectedReport(e.target.value)}
                   className={`px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-400 bg-white min-w-[220px] ${selectedReport === '' ? 'text-gray-400' : 'text-gray-700'}`}
                 >
                   <option value="" disabled>Mẫu báo cáo</option>
                   {visibleReports.map(template => (
                     <option key={template.id} value={template.id} className="text-gray-700">{template.name}</option>
                   ))}
                 </select>
                 <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors whitespace-nowrap h-[34px] flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Nạp dữ liệu
                 </button>
               </div>
             </div>
             <button 
                onClick={handleExportExcel}
                className="flex items-center justify-center gap-2 px-4 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors shadow-sm whitespace-nowrap h-[34px]"
             >
               <FileDown className="w-4 h-4" />
               Xuất Excel
             </button>
             <button 
                onClick={() => alert('Chức năng xuất báo cáo đang được phát triển')}
                className="flex items-center justify-center gap-2 px-4 py-1.5 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition-colors shadow-sm whitespace-nowrap h-[34px]"
             >
               <Printer className="w-4 h-4" />
               Xuất báo cáo
             </button>
          </div>
        </div>

        {/* Secondary Controls: Count and Select All (Only for Container Report) */}
        {isContainerReport && (
          <div className="flex justify-end items-center gap-3 text-sm">
             <span className="text-gray-600">Số dòng: {entries.length}</span>
             <button onClick={selectAll} className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
               <CheckCircle2 className="w-3 h-3" /> Chọn tất cả
             </button>
             <button onClick={deselectAll} className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
               <XCircle className="w-3 h-3" /> Bỏ chọn
             </button>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto px-4 pb-4">
      {!areAllFiltersSelected ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 border border-dashed border-gray-300 rounded-lg m-4 bg-gray-50">
            <Filter className="w-8 h-8 mb-2 opacity-50" />
            <span>Vui lòng chọn đầy đủ các tiêu chí lọc để xem dữ liệu.</span>
          </div>
        ) : (
        <>
        {isGeneralCargoReport ? (
          /* General Cargo Table Structure (Report 11, 12) */
          <table className="w-full text-left border-collapse border border-gray-400">
            <thead>
              <tr className="bg-white text-black text-sm text-center">
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  SỐ BL
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  Số lệnh
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[150px] align-middle">
                  LOẠI HÀNG<br/><span className="font-normal text-xs">Description</span>
                </th>
                <th colSpan={10} className="px-2 py-2 border border-black font-semibold text-center">
                  SỐ LƯỢNG ( Bao, Kiện )<br/><span className="font-normal text-xs">Number of packages</span>
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[80px] align-middle">
                  Cộng<br/><span className="font-normal text-xs">Total</span>
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  KHỐI LƯỢNG<br/>( Tấn )<br/><span className="font-normal text-xs">Gross Weight</span>
                </th>
              </tr>
              <tr className="bg-white text-black text-sm text-center">
                {/* 5 Pairs of Columns for Quantity */}
                {[...Array(5)].map((_, i) => (
                  <React.Fragment key={i}>
                    <th className="px-1 py-1 border border-black font-normal text-xs min-w-[60px]">PKgs/pcs</th>
                    <th className="px-1 py-1 border border-black font-normal text-xs min-w-[40px]">Rời</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {generalEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.blNo}
                      onChange={(e) => handleGeneralInputChange(entry.id, 'blNo', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.orderNo}
                      onChange={(e) => handleGeneralInputChange(entry.id, 'orderNo', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.description}
                      onChange={(e) => handleGeneralInputChange(entry.id, 'description', e.target.value)}
                    />
                  </td>
                  {/* Quantity Columns */}
                  {entry.quantities.map((qty, idx) => (
                    <React.Fragment key={idx}>
                      <td className="p-0 border border-black border-dotted">
                        <input 
                          className="w-full px-1 py-1 outline-none bg-transparent text-center"
                          value={qty.pkgs}
                          onChange={(e) => handleQuantityChange(entry.id, idx, 'pkgs', e.target.value)}
                        />
                      </td>
                      <td className="p-0 border border-black border-dotted">
                        <input 
                          className="w-full px-1 py-1 outline-none bg-transparent text-center"
                          value={qty.loose}
                          onChange={(e) => handleQuantityChange(entry.id, idx, 'loose', e.target.value)}
                        />
                      </td>
                    </React.Fragment>
                  ))}
                  <td className="p-0 border border-black border-dotted">
                     <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.total}
                      onChange={(e) => handleGeneralInputChange(entry.id, 'total', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                     <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.grossWeight}
                      onChange={(e) => handleGeneralInputChange(entry.id, 'grossWeight', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
              {/* Spacer rows for General Cargo */}
              {Array.from({ length: Math.max(0, 10 - generalEntries.length) }).map((_, i) => (
                 <tr key={`empty-gen-${i}`}>
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                   {[...Array(10)].map((_, j) => (
                     <td key={j} className="p-4 border border-black border-dotted"></td>
                   ))}
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                 </tr>
              ))}
            </tbody>
          </table>
        ) : isBargeDeliveryReport ? (
           /* Barge Delivery Table (Report 2, 3) - Simple Grid with BL/Order */
           <table className="w-full text-left border-collapse border border-gray-400">
            <thead>
              <tr className="bg-white text-black text-sm text-center">
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  SỐ BL
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  Số lệnh
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[150px] align-middle">
                  LOẠI HÀNG<br/><span className="font-normal text-xs">Description</span>
                </th>
                <th colSpan={8} className="px-2 py-2 border border-black font-semibold text-center align-middle">
                  SỐ LƯỢNG ( Bao, Kiện )<br/><span className="font-normal text-xs">Number of packages</span>
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[80px] align-middle">
                  Cộng<br/><span className="font-normal text-xs">Total</span>
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  KHỐI LƯỢNG<br/>( Tấn )<br/><span className="font-normal text-xs">Gross Weight</span>
                </th>
              </tr>
              {/* Empty sub-header row for spacing consistency if needed, though hidden */}
              <tr className="bg-white text-black text-sm text-center h-0">
              </tr>
            </thead>
            <tbody>
              {bargeDeliveryEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.blNo}
                      onChange={(e) => handleBargeDeliveryInputChange(entry.id, 'blNo', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.orderNo}
                      onChange={(e) => handleBargeDeliveryInputChange(entry.id, 'orderNo', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.description}
                      onChange={(e) => handleBargeDeliveryInputChange(entry.id, 'description', e.target.value)}
                    />
                  </td>
                  {/* Simple Quantity Columns */}
                  {entry.quantities.map((qty, idx) => (
                    <td key={idx} className="p-0 border border-black border-dotted min-w-[50px]">
                      <input 
                        className="w-full px-1 py-1 outline-none bg-transparent text-center"
                        value={qty}
                        onChange={(e) => handleBargeDeliveryQuantityChange(entry.id, idx, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className="p-0 border border-black border-dotted">
                     <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.total}
                      onChange={(e) => handleBargeDeliveryInputChange(entry.id, 'total', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                     <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.grossWeight}
                      onChange={(e) => handleBargeDeliveryInputChange(entry.id, 'grossWeight', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
               {/* Spacer rows */}
               {Array.from({ length: Math.max(0, 10 - bargeDeliveryEntries.length) }).map((_, i) => (
                 <tr key={`empty-barge-del-${i}`}>
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                   {[...Array(8)].map((_, j) => (
                     <td key={j} className="p-4 border border-black border-dotted"></td>
                   ))}
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                 </tr>
              ))}
            </tbody>
           </table>
        ) : isTruckGenReport ? (
           /* Truck General Report (Report 6, 8, 9) - Truck No + Complex Quantity */
           <table className="w-full text-left border-collapse border border-gray-400">
            <thead>
              <tr className="bg-white text-black text-sm text-center">
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  Số xe
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  Số mooc
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[150px] align-middle">
                  LOẠI HÀNG<br/><span className="font-normal text-xs">Description</span>
                </th>
                <th colSpan={10} className="px-2 py-2 border border-black font-semibold text-center">
                  SỐ LƯỢNG ( Bao, Kiện )<br/><span className="font-normal text-xs">Number of packages</span>
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[80px] align-middle">
                  Cộng<br/><span className="font-normal text-xs">Total</span>
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  KHỐI LƯỢNG<br/>( Tấn )<br/><span className="font-normal text-xs">Gross Weight</span>
                </th>
              </tr>
              <tr className="bg-white text-black text-sm text-center">
                {/* 5 Pairs of Columns for Quantity */}
                {[...Array(5)].map((_, i) => (
                  <React.Fragment key={i}>
                    <th className="px-1 py-1 border border-black font-normal text-xs min-w-[60px]">PKgs/pcs</th>
                    <th className="px-1 py-1 border border-black font-normal text-xs min-w-[40px]">Rời</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {truckGenEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.truckNo}
                      onChange={(e) => handleTruckGenInputChange(entry.id, 'truckNo', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.trailerNo}
                      onChange={(e) => handleTruckGenInputChange(entry.id, 'trailerNo', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.description}
                      onChange={(e) => handleTruckGenInputChange(entry.id, 'description', e.target.value)}
                    />
                  </td>
                  {/* Quantity Columns */}
                  {entry.quantities.map((qty, idx) => (
                    <React.Fragment key={idx}>
                      <td className="p-0 border border-black border-dotted">
                        <input 
                          className="w-full px-1 py-1 outline-none bg-transparent text-center"
                          value={qty.pkgs}
                          onChange={(e) => handleTruckGenQuantityChange(entry.id, idx, 'pkgs', e.target.value)}
                        />
                      </td>
                      <td className="p-0 border border-black border-dotted">
                        <input 
                          className="w-full px-1 py-1 outline-none bg-transparent text-center"
                          value={qty.loose}
                          onChange={(e) => handleTruckGenQuantityChange(entry.id, idx, 'loose', e.target.value)}
                        />
                      </td>
                    </React.Fragment>
                  ))}
                  <td className="p-0 border border-black border-dotted">
                     <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.total}
                      onChange={(e) => handleTruckGenInputChange(entry.id, 'total', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                     <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.grossWeight}
                      onChange={(e) => handleTruckGenInputChange(entry.id, 'grossWeight', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
              {/* Spacer rows */}
              {Array.from({ length: Math.max(0, 10 - truckGenEntries.length) }).map((_, i) => (
                 <tr key={`empty-truck-gen-${i}`}>
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                   {[...Array(10)].map((_, j) => (
                     <td key={j} className="p-4 border border-black border-dotted"></td>
                   ))}
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                 </tr>
              ))}
            </tbody>
           </table>
        ) : isTruckReport ? (
           /* Truck Report (Report 4, 5, 7) - Truck No + Simple Quantity Columns */
           <table className="w-full text-left border-collapse border border-gray-400">
            <thead>
              <tr className="bg-white text-black text-sm text-center">
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  Số xe
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  Số mooc
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[150px] align-middle">
                  LOẠI HÀNG<br/><span className="font-normal text-xs">Description</span>
                </th>
                <th colSpan={8} className="px-2 py-2 border border-black font-semibold text-center align-middle">
                  SỐ LƯỢNG ( Bao, Kiện )<br/><span className="font-normal text-xs">Number of packages</span>
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[80px] align-middle">
                  Cộng<br/><span className="font-normal text-xs">Total</span>
                </th>
                <th rowSpan={2} className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">
                  KHỐI LƯỢNG<br/>( Tấn )<br/><span className="font-normal text-xs">Gross Weight</span>
                </th>
              </tr>
              {/* Empty sub-header row for spacing consistency if needed */}
              <tr className="bg-white text-black text-sm text-center h-0">
              </tr>
            </thead>
            <tbody>
              {truckEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.truckNo}
                      onChange={(e) => handleTruckInputChange(entry.id, 'truckNo', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.trailerNo}
                      onChange={(e) => handleTruckInputChange(entry.id, 'trailerNo', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                    <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.description}
                      onChange={(e) => handleTruckInputChange(entry.id, 'description', e.target.value)}
                    />
                  </td>
                  {/* Simple Quantity Columns */}
                  {entry.quantities.map((qty, idx) => (
                    <td key={idx} className="p-0 border border-black border-dotted min-w-[50px]">
                      <input 
                        className="w-full px-1 py-1 outline-none bg-transparent text-center"
                        value={qty}
                        onChange={(e) => handleTruckQuantityChange(entry.id, idx, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className="p-0 border border-black border-dotted">
                     <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.total}
                      onChange={(e) => handleTruckInputChange(entry.id, 'total', e.target.value)}
                    />
                  </td>
                  <td className="p-0 border border-black border-dotted">
                     <input 
                      className="w-full px-2 py-1 outline-none bg-transparent text-center"
                      value={entry.grossWeight}
                      onChange={(e) => handleTruckInputChange(entry.id, 'grossWeight', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
               {/* Spacer rows */}
               {Array.from({ length: Math.max(0, 10 - truckEntries.length) }).map((_, i) => (
                 <tr key={`empty-truck-${i}`}>
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                   {[...Array(8)].map((_, j) => (
                     <td key={j} className="p-4 border border-black border-dotted"></td>
                   ))}
                   <td className="p-4 border border-black border-dotted"></td>
                   <td className="p-4 border border-black border-dotted"></td>
                 </tr>
              ))}
            </tbody>
           </table>
        ) : isWarehouseReport ? (
          /* Warehouse Report (Report 10) */
          <table className="w-full text-left border-collapse border border-gray-400">
             <thead>
               <tr className="bg-white text-black text-sm text-center">
                 <th className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">Vị trí bãi</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">Số lệnh</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">Số xe</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">Số mooc</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">Cách thức</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[80px] align-middle">Kiện</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[100px] align-middle">Trọng lượng</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[60px] align-middle">Psc</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[60px] align-middle">Rời</th>
                 <th className="px-2 py-2 border border-black font-semibold min-w-[150px] align-middle">Tình trạng<br/>hàng hóa</th>
               </tr>
             </thead>
             <tbody>
              {warehouseEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.yardLocation} onChange={(e) => handleWarehouseInputChange(entry.id, 'yardLocation', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.orderNo} onChange={(e) => handleWarehouseInputChange(entry.id, 'orderNo', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.truckNo} onChange={(e) => handleWarehouseInputChange(entry.id, 'truckNo', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.trailerNo} onChange={(e) => handleWarehouseInputChange(entry.id, 'trailerNo', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.method} onChange={(e) => handleWarehouseInputChange(entry.id, 'method', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.packages} onChange={(e) => handleWarehouseInputChange(entry.id, 'packages', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.weight} onChange={(e) => handleWarehouseInputChange(entry.id, 'weight', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.psc} onChange={(e) => handleWarehouseInputChange(entry.id, 'psc', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.loose} onChange={(e) => handleWarehouseInputChange(entry.id, 'loose', e.target.value)} /></td>
                  <td className="p-0 border border-black border-dotted"><input className="w-full px-2 py-1 outline-none bg-transparent text-center" value={entry.condition} onChange={(e) => handleWarehouseInputChange(entry.id, 'condition', e.target.value)} /></td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 10 - warehouseEntries.length) }).map((_, i) => (
                <tr key={`empty-wh-${i}`}>
                   {[...Array(10)].map((_, j) => <td key={j} className="p-4 border border-black border-dotted"></td>)}
                </tr>
              ))}
             </tbody>
          </table>
        ) : (
          /* Original Container Tally Table */
          <table className="w-full text-left border-collapse border border-blue-200">
            <thead>
              <tr className="bg-gradient-to-b from-[#e6f3ff] to-[#cfe7fa] text-[#0f4c75] text-sm">
                <th className="px-4 py-3 border border-blue-200 font-bold w-16 text-center">
                  STT
                </th>
                <th className="px-4 py-3 border border-blue-200 font-bold">Số Container</th>
                <th className="px-4 py-3 border border-blue-200 font-bold">Số Chì</th>
                <th className="px-4 py-3 border border-blue-200 font-bold w-24">ISO</th>
                <th className="px-4 py-3 border border-blue-200 font-bold w-20">F/E</th>
                <th className="px-4 py-3 border border-blue-200 font-bold">Vị trí</th>
                <th className="px-4 py-3 border border-blue-200 font-bold">Ghi chú</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {(entries).map((entry, index) => (
                <tr key={entry.id} className={`hover:bg-blue-50 transition-colors ${entry.selected ? 'bg-blue-100' : ''}`}>
                  <td 
                    className="p-2 border border-gray-200 text-center cursor-pointer select-none" 
                    onClick={() => toggleSelection(entry.id)}
                    title="Nhấn để chọn dòng"
                  >
                     <span className="text-gray-600 font-medium">{index + 1}</span>
                  </td>
                  <td className="p-0 border border-gray-200">
                    <input
                      type="text"
                      value={entry.containerNo}
                      onChange={(e) => handleInputChange(entry.id, 'containerNo', e.target.value)}
                      className="w-full px-4 py-2 outline-none bg-transparent"
                      placeholder="ABCD 1234567"
                    />
                  </td>
                  <td className="p-0 border border-gray-200">
                    <input
                      type="text"
                      value={entry.sealNo}
                      onChange={(e) => handleInputChange(entry.id, 'sealNo', e.target.value)}
                      className="w-full px-4 py-2 outline-none bg-transparent"
                    />
                  </td>
                  <td className="p-0 border border-gray-200">
                    <input
                      type="text"
                      value={entry.sizeType}
                      onChange={(e) => handleInputChange(entry.id, 'sizeType', e.target.value)}
                      className="w-full px-4 py-2 outline-none bg-transparent"
                      placeholder="20DC"
                    />
                  </td>
                  <td className="p-0 border border-gray-200">
                    <select
                      value={entry.fe}
                      onChange={(e) => handleInputChange(entry.id, 'fe', e.target.value)}
                      className="w-full px-4 py-2 outline-none bg-transparent cursor-pointer"
                    >
                      <option value="F">F</option>
                      <option value="E">E</option>
                    </select>
                  </td>
                  <td className="p-0 border border-gray-200">
                    <input
                      type="text"
                      value={entry.location}
                      onChange={(e) => handleInputChange(entry.id, 'location', e.target.value)}
                      className="w-full px-4 py-2 outline-none bg-transparent"
                    />
                  </td>
                  <td className="p-0 border border-gray-200">
                    <input
                      type="text"
                      value={entry.remark}
                      onChange={(e) => handleInputChange(entry.id, 'remark', e.target.value)}
                      className={`w-full px-4 py-2 outline-none bg-transparent ${entry.remark ? 'text-red-500' : ''}`}
                    />
                  </td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 4 - entries.length) }).map((_, i) => (
                <tr key={`empty-container-${i}`}>
                   <td className="p-4 border border-gray-200"></td>
                   <td className="p-4 border border-gray-200"></td>
                   <td className="p-4 border border-gray-200"></td>
                   <td className="p-4 border border-gray-200"></td>
                   <td className="p-4 border border-gray-200"></td>
                   <td className="p-4 border border-gray-200"></td>
                   <td className="p-4 border border-gray-200"></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </>
      )}
      </div>
    </div>
  );
};

export default BargeTable;
