# Functional Programming Training


##  Learn

### tut1: map 

```
  const data = [1, 2, 3, 4];
```

Add one to `data` elements.

Should use : { map, [add] }

### tut2: reduce 

Sum  `data` elements.

Should use : { reduce, add }

### tut3: reduce  again

Compute factorial 4 with `fact([1,2,3,4])`

Should use : { reduce, multiply }


Compute factorial 4 with `fact(4)` using `Array.from()`

Compute factorial 4 with `fact(4)` using { times, ... }

### tut4: fromPairs

```
  const data = [
    { id: 1, label: 'data1' },
    { id: 2, label: 'data2' },
    { id: 3, label: 'data3' },
    { id: 4, label: 'data4' },
  ];
```

Transform data as an Objet with { [data[i].id]: data[i] }

Should use : { map, fromPairs }

Should get:

```
{ '1': { id: 1, label: 'data1' },
  '2': { id: 2, label: 'data2' },
  '3': { id: 3, label: 'data3' },
  '4': { id: 4, label: 'data4' } 
}
```

### tut5: compose

Same as before but use { compose } to chain functions.

### tut6: reduce

Write `R.map(x => [ x, x ], [1, 2, 3, 4])` with { reduce and concat }.

### tut7: filter

```
  const data = R.times(R.identity, 10);
```

Filter odd numbers.

Should use : { filter }

### tut8: filter as reduce

Implement filter with reduce.

Same as before, but only use { reduce, concat, and JS } without 'if';

##  Validate

```
  const todos = [
    // include data from './fixtures/todos'
  ];
```

### test1: map

List all todos as [[type, label, dueDate]].

Should use : { compose, pick*, values, map }

Output `props` ('type', 'label', dueDate) must be parameters.

ex:

```
[ 
  [ 'learning', 'learn JS libraries', date1 ],
  [ 'learn how to craft SPA', date2 ],
  [ 'coding', 'code first sample', date3 ],
  [ 'coding', 'implement tests', date4 ] 
]
```


### test2: map and filter

Same as previous but only report about incoming todos (todo.dueDate >= now())

Should use : { ...test1, filter }

### test3: filter and reduce

Compute total running time of 'learning' todos.

Should use : { propOr, reduce, filter, compose }

### test4: filter and chain

Do the same but without `reduce`

Should use : { compose, filter, chain, pluck, ... }
