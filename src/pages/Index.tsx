import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [scanCode, setScanCode] = useState('');
  const [operationCount, setOperationCount] = useState(0);
  const [trainingMode, setTrainingMode] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  const stats = {
    processed: 47,
    issued: 32,
    returned: 8,
    errors: 2
  };
  
  const mockOrders = [
    { id: 'WB001234567', status: 'ready', customer: 'Иванов И.И.', items: 2, date: '15.07.2025' },
    { id: 'WB001234568', status: 'processing', customer: 'Петрова А.С.', items: 1, date: '15.07.2025' },
    { id: 'WB001234569', status: 'ready', customer: 'Сидоров П.П.', items: 3, date: '15.07.2025' }
  ];
  
  const startOperation = (operation: string) => {
    setCurrentOperation(operation);
    setScanCode('');
    setSelectedItem(null);
  };
  
  const handleScan = () => {
    if (scanCode.trim()) {
      setOperationCount(prev => prev + 1);
      setScanCode('');
      
      // Simulate finding an item
      const mockItem = {
        code: scanCode,
        name: 'Товар ' + scanCode.slice(-4),
        status: currentOperation === 'receive' ? 'received' : currentOperation === 'issue' ? 'issued' : 'returned'
      };
      setSelectedItem(mockItem);
      
      setTimeout(() => {
        setSelectedItem(null);
      }, 2000);
    }
  };
  
  const resetOperation = () => {
    setCurrentOperation(null);
    setScanCode('');
    setSelectedItem(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="Package" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">WB Point Simulator</h1>
              <p className="text-sm text-gray-500">Обучающий режим для новых сотрудников</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={trainingMode ? "default" : "secondary"} className="bg-green-100 text-green-800">
              <Icon name="GraduationCap" className="h-4 w-4 mr-1" />
              Обучение
            </Badge>
            <Badge variant="outline" className="text-gray-600">
              <Icon name="Clock" className="h-4 w-4 mr-1" />
              Смена: 09:00 - 18:00
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Stats Dashboard */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Обработано</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.processed}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="Package" className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Выдано</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.issued}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Возвращено</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.returned}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Icon name="RotateCcw" className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Ошибки</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.errors}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Icon name="AlertCircle" className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operations Panel */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Zap" className="h-5 w-5 text-purple-600" />
              <span>Операции</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!currentOperation ? (
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  className="h-16 text-left justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200"
                  onClick={() => startOperation('receive')}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Package" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Прием товара</p>
                      <p className="text-sm opacity-75">Получение и размещение заказов</p>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  className="h-16 text-left justify-start bg-green-50 hover:bg-green-100 text-green-700 border-2 border-green-200"
                  onClick={() => startOperation('issue')}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="HandHeart" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Выдача товара</p>
                      <p className="text-sm opacity-75">Выдача заказов клиентам</p>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  className="h-16 text-left justify-start bg-orange-50 hover:bg-orange-100 text-orange-700 border-2 border-orange-200"
                  onClick={() => startOperation('return')}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="RotateCcw" className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">Возврат товара</p>
                      <p className="text-sm opacity-75">Обработка возвратов</p>
                    </div>
                  </div>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentOperation === 'receive' && 'Прием товара'}
                    {currentOperation === 'issue' && 'Выдача товара'}
                    {currentOperation === 'return' && 'Возврат товара'}
                  </h3>
                  <Button variant="outline" size="sm" onClick={resetOperation}>
                    <Icon name="X" className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Отсканируйте или введите код"
                    value={scanCode}
                    onChange={(e) => setScanCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                    className="flex-1"
                  />
                  <Button onClick={handleScan} disabled={!scanCode.trim()}>
                    <Icon name="Scan" className="h-4 w-4" />
                  </Button>
                </div>
                
                {selectedItem && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-800">Операция выполнена</p>
                        <p className="text-sm text-green-600">{selectedItem.name} - {selectedItem.status}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-center text-sm text-gray-500">
                  Операций выполнено: {operationCount}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Orders List */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="List" className="h-5 w-5 text-purple-600" />
              <span>Заказы на выдачу</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <div key={order.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">{order.id}</p>
                        <Badge 
                          variant={order.status === 'ready' ? 'default' : 'secondary'}
                          className={order.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {order.status === 'ready' ? 'Готов' : 'В обработке'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.items} товара • {order.date}</p>
                    </div>
                    <Icon name="ChevronRight" className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Training Progress */}
      {trainingMode && (
        <div className="max-w-6xl mx-auto mt-6">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <Icon name="GraduationCap" className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Прогресс обучения</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Основы работы с ПВЗ</span>
                      <span className="text-purple-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Отличная работа! Продолжайте выполнять операции для завершения обучения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;