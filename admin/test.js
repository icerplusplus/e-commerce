const dequy = (num) => {
  if (num === 2) console.log(num);
  else dequy(num - 1);
};

dequy(10);
