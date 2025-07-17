import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [scanCode, setScanCode] = useState('');
  const [selectedPVZ, setSelectedPVZ] = useState('61440140');
  const [workStatus, setWorkStatus] = useState('working');
  const [currentDateTime] = useState('17.07.2025 20:16');
  
  const stats = {
    received: 0,
    issued: 0,
    returned: 0,
    pending: 0,
    defective: 0,
    rejected: 0
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
    if (scanCode.trim()) {
      alert(`Отсканирован код: ${scanCode}`);
      setScanCode('');
    }
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
                    <p className="text-sm text-green-600 font-medium">Неизвестен</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Мой рабочий статус</p>
                    <p className="text-sm text-green-600 font-medium">Работаю</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Сейчас я на рабочем месте</p>
                    <p className="text-sm text-green-600 font-medium">Нет</p>
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
              <div className="flex space-x-4">
                <Input
                  placeholder="Введите или отсканируйте штрихкод"
                  value={scanCode}
                  onChange={(e) => setScanCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                  className="flex-1"
                />
                <Button onClick={handleScan} className="bg-purple-600 hover:bg-purple-700">
                  <Icon name="Search" className="h-4 w-4 mr-2" />
                  Поиск
                </Button>
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
    </div>
  );
};

export default Index;