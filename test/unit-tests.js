const tape = require('tape')
const _test = require('tape-promise').default
const test = _test(tape)


/* EXAMPLE (With Promise):

test('Title:', async (t) => {

    await myFunction1(env.options).then(resp => {
        t.assert(resp === '123', "myFunction1(): OK")
    })

    await myFunction2(env.options).then(obj => {
        t.deepEqual(obj, {
            param1: 1,
            param2: 'teste'
        }, "myFunction2(): OK")
    })

    t.end()
})

*/

/* EXAMPLE (Without Promise):

test('Title:', (t) => {
    t.assert(myFunc("param1") === false, " OK")
    t.assert(myFunc("param2") === true, " OK")
    t.end()
})

*/