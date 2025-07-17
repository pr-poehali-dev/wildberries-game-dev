import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Order {
  id: string;
  customer: string;
  items: number;
  status: 'ready' | 'processing' | 'issued' | 'returned';
  date: string;
  phone: string;
  totalAmount: number;
  itemList: string[];
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [scanCode, setScanCode] = useState('');
  const [selectedPVZ, setSelectedPVZ] = useState('61440140');
  const [workStatus, setWorkStatus] = useState('working');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  
  const [stats, setStats] = useState({
    received: 0,
    issued: 0,
    returned: 0,
    pending: 0,
    defective: 0,
    rejected: 0
  });
  
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'WB7654321',
      customer: 'Иванов Иван Иванович',
      items: 2,
      status: 'ready',
      date: '17.07.2025',
      phone: '+7(999)123-45-67',
      totalAmount: 2850,
      itemList: ['Футболка мужская', 'Джинсы классические']
    },
    {
      id: 'WB7654322',
      customer: 'Петрова Анна Сергеевна',
      items: 1,
      status: 'ready',
      date: '17.07.2025',
      phone: '+7(999)876-54-32',
      totalAmount: 1250,
      itemList: ['Платье летнее']
    },
    {
      id: 'WB7654323',
      customer: 'Сидоров Петр Петрович',
      items: 3,
      status: 'processing',
      date: '17.07.2025',
      phone: '+7(999)555-33-22',
      totalAmount: 4200,
      itemList: ['Кроссовки спортивные', 'Рюкзак', 'Кепка']
    },
    {
      id: 'WB7654324',
      customer: 'Козлова Мария Александровна',
      items: 1,
      status: 'ready',
      date: '17.07.2025',
      phone: '+7(999)111-22-33',
      totalAmount: 890,
      itemList: ['Сумка женская']
    },
    {
      id: 'WB7654325',
      customer: 'Николаев Дмитрий Викторович',
      items: 2,
      status: 'ready',
      date: '17.07.2025',
      phone: '+7(999)444-55-66',
      totalAmount: 3150,
      itemList: ['Куртка зимняя', 'Шарф']
    }
  ]);
  
  // Update current date/time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentDateTime(formatted);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('wb-stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);
  
  // Save stats to localStorage
  const updateStats = (newStats: typeof stats) => {
    setStats(newStats);
    localStorage.setItem('wb-stats', JSON.stringify(newStats));
  };
  
  const sidebarItems = [
    { id: 'profile', label: 'Мой профиль', icon: 'User', active: true },
    { id: 'goods', label: 'ТОВАРЫ', icon: 'Package', isSection: true },
    { id: 'search', label: 'Поиск ШК', icon: 'Search' },
    { id: 'issued', label: 'Выданные', icon: 'CheckCircle' },
    { id: 'inventory', label: 'Инвентаризация', icon: 'ClipboardList' },
    { id: 'analytics', label: 'АНАЛИТИКА И ФИНАНСЫ', icon: 'BarChart', isSection: true },
    { id: 'stats', label: 'Статистика по коробкам и ШК', icon: 'BarChart3' },
    { id: 'deliveries', label: 'Ближайшие поставки', icon: 'Truck' },
    { id: 'reception', label: 'Статистика приемки', icon: 'Package2' },
    { id: 'rating', label: 'Рейтинг', icon: 'Star' },
    { id: 'dependent', label: 'Зависшие ШК', icon: 'AlertTriangle' },
    { id: 'complaints', label: 'Подмены', icon: 'AlertCircle' },
    { id: 'defects', label: 'Брак', icon: 'XCircle' }
  ];
  
  const handleScan = () => {
    if (!scanCode.trim()) return;
    
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const order = orders.find(o => o.id === scanCode.trim());
      
      if (order) {
        setFoundOrder(order);
        setShowOrderDialog(true);
        toast({
          title: "Заказ найден!",
          description: `Заказ ${order.id} для ${order.customer}`,
        });
      } else {
        toast({
          title: "Заказ не найден",
          description: "Проверьте правильность введенного кода",
          variant: "destructive"
        });
      }
      
      setIsScanning(false);
      setScanCode('');
    }, 1000);
  };
  
  const handleIssueOrder = () => {
    if (!foundOrder) return;
    
    const updatedOrders = orders.map(order => 
      order.id === foundOrder.id 
        ? { ...order, status: 'issued' as const }
        : order
    );
    
    setOrders(updatedOrders);
    
    const newStats = {
      ...stats,
      issued: stats.issued + 1,
      pending: Math.max(0, stats.pending - 1)
    };
    updateStats(newStats);
    
    toast({
      title: "Заказ выдан!",
      description: `Заказ ${foundOrder.id} успешно выдан клиенту`,
    });
    
    setShowOrderDialog(false);
    setFoundOrder(null);
  };
  
  const handleReturnOrder = () => {
    if (!foundOrder) return;
    
    const updatedOrders = orders.map(order => 
      order.id === foundOrder.id 
        ? { ...order, status: 'returned' as const }
        : order
    );
    
    setOrders(updatedOrders);
    
    const newStats = {
      ...stats,
      returned: stats.returned + 1
    };
    updateStats(newStats);
    
    toast({
      title: "Заказ возвращен!",
      description: `Заказ ${foundOrder.id} отправлен на возврат`,
    });
    
    setShowOrderDialog(false);
    setFoundOrder(null);
  };
  
  const handleReceiveOrder = () => {
    const newStats = {
      ...stats,
      received: stats.received + 1,
      pending: stats.pending + 1
    };
    updateStats(newStats);
    
    toast({
      title: "Товар принят!",
      description: "Товар успешно принят на склад",
    });
  };
  
  const resetStats = () => {
    const resetStats = {
      received: 0,
      issued: 0,
      returned: 0,
      pending: 0,
      defective: 0,
      rejected: 0
    };
    updateStats(resetStats);
    
    toast({
      title: "Статистика сброшена",
      description: "Все счетчики обнулены",
    });
  };
  
  const renderMainContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Мой профиль</h2>
              <div className="space-y-2">
                <p className="text-gray-600">Гелазутдинов Виктор Гелазутдинович</p>
                <p className="text-gray-600">Ринатович</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Мои успехи */}
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
                    <Icon name="ChevronDown" className="h-4 w-4 mr-2" />
                    Мои успехи
                  </CardTitle>
                  <p className="text-xs text-gray-500">За сегодня</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">ЭФФЕКТИВНОСТЬ</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500">Принято</p>
                        <p className="text-lg font-semibold">{stats.received}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Выдано</p>
                        <p className="text-lg font-semibold">{stats.issued}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Возврат</p>
                        <p className="text-lg font-semibold">{stats.returned}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-2">НАЙТИ И ВЕРНУТЬ</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Завершить ШК к удержанию</span>
                        <span>{stats.pending}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Вернуть на склад</span>
                        <span>{stats.returned}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-2">УДЕРЖАНИЯ</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>За что</span>
                        <span>Кол-во, шт</span>
                        <span>Сумма</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Неоспоренные товары</span>
                        <span>{stats.defective}</span>
                        <span>{stats.defective}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Подмены</span>
                        <span>{stats.rejected}</span>
                        <span>{stats.rejected}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Брак</span>
                        <span>{stats.defective}</span>
                        <span>{stats.defective}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Рабочий профиль */}
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
                    <Icon name="ChevronDown" className="h-4 w-4 mr-2" />
                    Рабочий профиль
                  </CardTitle>
                  <p className="text-xs text-gray-500">ID: {selectedPVZ}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Мой активный ПВЗ #-</p>
                    <p className="text-sm text-green-600 font-medium">ПВЗ {selectedPVZ}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Мой рабочий статус</p>
                    <p className="text-sm text-green-600 font-medium">
                      {workStatus === 'working' ? 'Работаю' : 'Не работаю'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Сейчас я на рабочем месте</p>
                    <p className="text-sm text-green-600 font-medium">Да</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-2">ВСЕ ПВЗ, ГДЕ Я РАБОТАЮ</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono">#</span>
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Уведомления */}
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
                    <Icon name="ChevronDown" className="h-4 w-4 mr-2" />
                    Уведомления
                  </CardTitle>
                  <p className="text-xs text-gray-500">Чтобы ничего не пропустить</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Загрузка всех списков</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Личный профиль */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
                  <Icon name="ChevronUp" className="h-4 w-4 mr-2" />
                  Личный профиль
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        );
      
      case 'search':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Поиск ШК</h2>
              <div className="flex space-x-4 mb-6">
                <Input
                  placeholder="Введите или отсканируйте штрихкод (например: WB7654321)"
                  value={scanCode}
                  onChange={(e) => setScanCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                  className="flex-1"
                  disabled={isScanning}
                />
                <Button 
                  onClick={handleScan} 
                  disabled={!scanCode.trim() || isScanning}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isScanning ? (
                    <Icon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Icon name="Search" className="h-4 w-4 mr-2" />
                  )}
                  {isScanning ? 'Поиск...' : 'Поиск'}
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={handleReceiveOrder}
                  className="h-20 bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200"
                >
                  <div className="flex flex-col items-center">
                    <Icon name="Package" className="h-6 w-6 mb-2" />
                    <span className="font-semibold">Принять товар</span>
                  </div>
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="h-20 bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-200">
                      <div className="flex flex-col items-center">
                        <Icon name="RotateCcw" className="h-6 w-6 mb-2" />
                        <span className="font-semibold">Сбросить статистику</span>
                      </div>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Сброс статистики</AlertDialogTitle>
                      <AlertDialogDescription>
                        Вы уверены, что хотите сбросить всю статистику? Это действие нельзя отменить.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction onClick={resetStats}>
                        Сбросить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <Button 
                  onClick={() => setActiveSection('issued')}
                  className="h-20 bg-green-50 hover:bg-green-100 text-green-700 border-2 border-green-200"
                >
                  <div className="flex flex-col items-center">
                    <Icon name="List" className="h-6 w-6 mb-2" />
                    <span className="font-semibold">Выданные заказы</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 'issued':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Выданные заказы</h2>
              <div className="space-y-4">
                {orders.filter(order => order.status === 'issued').length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Нет выданных заказов</p>
                ) : (
                  orders.filter(order => order.status === 'issued').map(order => (
                    <div key={order.id} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.phone}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 mb-2">
                            Выдан
                          </Badge>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">{activeSection}</h2>
              <p className="text-gray-600">Раздел в разработке</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Menu" className="h-5 w-5 text-purple-600" />
            <Select value={selectedPVZ} onValueChange={setSelectedPVZ}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите ПВЗ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="61440140">Выберите ПВЗ</SelectItem>
              </SelectContent>
            </Select>
            <Icon name="BarChart" className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-xs text-gray-500">
            <div>Рейтинг</div>
            <div>ID ПВЗ: 0</div>
            <div>Сотрудник: {selectedPVZ}</div>
          </div>
        </div>
        
        <nav className="p-2">
          {sidebarItems.map((item) => (
            <div key={item.id}>
              {item.isSection ? (
                <div className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase tracking-wider">
                  {item.label}
                </div>
              ) : (
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon name={item.icon} className="h-4 w-4 mr-3" />
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                Не забывайте о курьерских заказах
              </div>
              <div className="text-sm text-gray-600">
                в ПВЗ может прийти курьер — выдайте ему клиентский заказ в пакет
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                NEW
              </Badge>
              <Icon name="Bell" className="h-5 w-5 text-gray-400" />
              <div className="text-sm text-gray-600">
                {currentDateTime}
              </div>
              <div className="text-sm text-gray-600">
                v9.7.314
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          {renderMainContent()}
        </main>
      </div>
      {/* Order Dialog */}
      <AlertDialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Найден заказ {foundOrder?.id}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Клиент:</p>
                    <p className="text-sm text-gray-600">{foundOrder?.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Телефон:</p>
                    <p className="text-sm text-gray-600">{foundOrder?.phone}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Товары ({foundOrder?.items} шт.):</p>
                  <div className="space-y-1">
                    {foundOrder?.itemList.map((item, index) => (
                      <p key={index} className="text-sm text-gray-600">• {item}</p>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Сумма:</p>
                    <p className="text-sm text-gray-600">{foundOrder?.totalAmount} ₽</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Дата:</p>
                    <p className="text-sm text-gray-600">{foundOrder?.date}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Статус:</p>
                  <Badge className={foundOrder?.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {foundOrder?.status === 'ready' ? 'Готов к выдаче' : 'В обработке'}
                  </Badge>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleReturnOrder}
              className="text-orange-600 border-orange-600 hover:bg-orange-50"
            >
              <Icon name="RotateCcw" className="h-4 w-4 mr-2" />
              Возврат
            </Button>
            <AlertDialogAction
              onClick={handleIssueOrder}
              className="bg-green-600 hover:bg-green-700"
            >
              <Icon name="CheckCircle" className="h-4 w-4 mr-2" />
              Выдать заказ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;