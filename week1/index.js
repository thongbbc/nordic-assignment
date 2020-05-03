const students = [
  {
    name: 'Nam',
    age: 24,
    gender: 'male',
  },
  {
    name: 'Mai',
    age: 22,
    gender: 'female',
  },
  {
    name: 'Trang',
    age: 23,
    gender: 'female',
  },
  {
    name: 'An',
    age: 20,
    gender: 'male',
  },
  {
    name: 'Thien',
    age: 27,
    gender: 'male',
  },
];

let male = 0
let female = 0
students.map(item => {
  if (item.gender === 'male') {
    male++
  } else {
    female++
  }
})
console.log(`Female: ${female}
Male: ${male}`)

const expectedArray = students.map(item => item.name)

console.log(expectedArray)