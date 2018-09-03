//
/* CallBack Way
a((n) => {
    console.log('fn a :', n);
    if (n === 10) {
        b(n, (nn) => {
            console.log('fn b :', nn);
            if (nn === 20) {
                c(nn, (nnn) => {
                    console.log('fn c :', nnn);
                })
            }
        })
    }
})

function a(cbf1) {
    let no = 10
    cbf1(no);
}

function b(nnb, cbf2) {
    let no = nnb + 10;
    cbf2(no);
}

function c(nnc, cbf3) {
    let no = nnc + 10;
    cbf3(no);
}
*/

//Async Way & Promise way
/*
async function tally() {
    let afn = await a();
    console.log('fn a -- :', afn);
    let bfn = await b(afn);
    console.log('fn b -- :', bfn);
    let cfn = await c(bfn);
    console.log('fn c -- :', cfn);
};
tally();
*/
a()
    .then(an => {
        console.log('fn a --- :', an);
        b(an)
            .then(bn => {
                console.log('fn b --- :', bn);
                c(bn)
                    .then(cn => {
                        console.log('fn c --- :', cn);
                    })
            })
    });


function a() {
    return new Promise((resolve, reject) => {
        let no = 10
        resolve(no);
    })
}

function b(nnb) {
    return new Promise((resolve, reject) => {
        let no = nnb + 10;
        resolve(no);
    })
}

function c(nnc) {
    return new Promise((resolve, reject) => {
        let no = nnc + 10;
        resolve(no);
    })
}