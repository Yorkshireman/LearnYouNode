var numbers = process.argv.slice(2);

var sum = 0;
for(i = 0; i < numbers.length; i++) {
	sum += Number(numbers[i]);
}

console.log(sum);