exports.mainPage = (req, res) => {
    res.json({message: 'Hello from Node.js!'})
}

exports.postMessage = (req, res) => {
    const {message} = req.body
    console.log(message);
    
    res.json({message})
};