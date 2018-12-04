const cluster = require('cluster');
// Получим количество ядер процессора
// Рекомендация при активной разработке ставить CPUCount 1
// const CPUCount = require("os").cpus().length;
const CPUCount = 1;
console.log(`CPUCount: ${CPUCount}`);

cluster.on('disconnect', (worker, code, signal) => {
  // при отключении соединения запустить нового рабочего
  console.log(`Worker ${worker.id} died`);
  // Создадим рабочего
  cluster.fork();
});

cluster.on('online', worker => {
  // Рабочий соединен
  console.log(`Worker ${worker.id} running`);
});

// Создадим рабочих в количестве CPUCount
for (let i = 0; i < CPUCount; ++i) {
  cluster.fork();
}
