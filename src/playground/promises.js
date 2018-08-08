const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Nathan',
            age: 26
        });
        reject('Something went wrong!');

    }, 1500);

});

promise.then((data) => {
    console.log('1', data);
}).catch((error) => {
    console.log('error: ', error)
});

// // // // // // // //

// Firebase practice //

// // // // // // // //

database.ref('notes').push({
    title: 'To do',
    body: 'Go for a run'
});

database.ref().set({
    name: 'Nathan',
    age: 25,
    stressLevel: 6,
    job: {
        title: 'Software Dev',
        company: 'Google'
    },
    isSingle: false,
    location: {
        city: 'Philidelphia',
        country: 'United States'
    }
}).then(() => {
    console.log('Data is saved');
}).catch((e) => {
    console.log('This failed.', e)
});

// database.ref('age').set(27);
// database.ref('location/city').set('Columbus')
// database.ref('attributes').set({
//     height: 73,
//     weight: 150
// }).then(() => {
//     console.log('Things set')
// }).catch(() => {
//     console.log('Didnt work')
// });

database.ref('isSingle')
    .remove()
    .then(() => {
        console.log('Completed');
    }).catch((e) => {
        console.log('Failed', e);
    });

// database.ref('isSingle').set(null);

// database.ref().update({
// name: 'Mike',
// age: 29,
// job: 'software dev',
// isSingle: null
// });

database.ref().update({
    'job/company': 'Amazon',
    stressLevel: 9,
    'location/city': 'Seattle'
});

database.ref()
    .once('value')
    .then((snapshot) => {
        const val = snapshot.val();
        console.log(val);
    }).catch(() => {
        console.log('Error fetching data', e)
    });

database.ref()
    .on('value', (snapshot) => {
        console.log(snapshot.val())
    });


database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
});






// child_removed

database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
});

// child_changed

database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
});

// child_added

database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val())
});


// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: 84325793285
// });

database.ref('expenses').on('value', (snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });
});

database.ref('expenses')
    .once('value')
    .then((snapshot) => {
        const expenses = [];

        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
    });