type ResultTuple = [number, string, number, string, string];

function summarizePerson(
  id: number,
  firstName: string,
  lastName: string,
  age: number,
  middleName?: string,
  hobbies?: string[],
  workInfo?: [string, number]
): ResultTuple {
  const fullName = `${firstName} ${middleName && middleName + ' '}${lastName}`;
  const personHobby = (hobbies && hobbies.join(', ')) ?? '-';
  const personJob = (workInfo && `${workInfo[0]} -> ${workInfo[1]}`) ?? '-';

  return [id, fullName, age, personHobby, personJob];
}
console.log(
  summarizePerson(
    12,
    'Eliot',
    'Des',
    20,
    'Braylen',
    ['tennis', 'football', 'hiking'],
    ['Sales Consultant', 2500]
  )
);
// [12, 'Eliot Braylen Des', 20, 'tennis, football, hiking', 'Sales Consultant -> 2500']
