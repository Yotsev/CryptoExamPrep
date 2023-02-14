function getFirstMongooseError(error) {
    const errors = Object.keys(error.errors).map(key => error.errors[key].message);

    return errors[0];
}

exports.getErrorMessage = (error) => {
    if (error.name === 'Error') {
        return error.message;
    } else if (error.name = 'ValidationError') {
        return getFirstMongooseError(error);
    }
};

//Same as the above but with switch
// exports.switchErrorMessages = (error) => {
//     switch (error.name) {
//         case 'Error':
//             return error.message
//             break;
//         case 'ValidationError':
//             return getFirstMongooseError(error);
//             break;
//         default:
//             return error.message
//             break;
//     }
// }

exports.parseError = (error) => {
    if (error.name == 'ValidationError') {
        return Object.values(error.errors).map(v => v.message);
    } else {
        return error.message.split('\n');
    }
}