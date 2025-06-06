function weatherDecorator() {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalDescriptor = descriptor.value;

    let cache: string[] = [];
    let lastUpdate: Date | null = null;

    descriptor.value = function () {
      const dateNow = new Date();

      if (!lastUpdate || dateNow.getTime() - lastUpdate.getTime() > 5000) {
        const data = originalDescriptor.call(this);
        cache = data.slice();
        lastUpdate = new Date();
        return data;
      } else {
        console.log('Returned from cache');
        return cache;
      }
    };
    return descriptor;
  };
}

class MockWeatherDataService {
  private weatherData: string[] = [
    'Sunny 8° to 20°',
    'Partially Cloudy 7° to 19°',
    'Sunny 5° to 18°',
  ];

  addWeatherData(data: string) {
    this.weatherData.push(data);
  }
  @weatherDecorator() getWeatherData() {
    return this.weatherData;
  }
}

let service = new MockWeatherDataService();
console.log(service.getWeatherData());
console.log(service.getWeatherData());
service.addWeatherData('Partially Cloudy 5° to 11°');
console.log(service.getWeatherData());

//7 seconds later
setTimeout(() => console.log(service.getWeatherData()), 7000);
