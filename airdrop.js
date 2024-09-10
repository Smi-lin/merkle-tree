// ARRAY OF ADDRESSES
const eligibleAddresses = [
    '0x6c0928055d528c3e707ae7ff82e614a40a54e220',
    '0x32482055067d517af3be473ef71de5dbbf8ab43a',
    '0x227ab6f928dcb8eff314086d20d21126b9194acc',
    '0x9af15c792ca89514b4b82f78825be4478079af14',
    '0x26d32427abecb7e9b9cb2a9ed64f0949466768c9',
    '0x446f59b967d0ba559284d2cb1fe51011c59f7dac',
    '0xb9403aa8b51c6abb0f12c9c3e6181724e3adb1c0',
    '0x5c9a442740d00aa4bd77ec67c44eb0a973b2e113',
    '0x1b9479ab0a2c116c55d933755615e04cf4dc288a',
    '0x13d831a6401430bd43b34559cb573ce2be46737d',
    '0x8d4b2775370216f2fbe24ce4ccb8264fe4ab9871',
    '0x53b9c53dbb18158038068fb5cc51eb982294dc1a',
    '0x886825c361d3422426e5d748c8ad0a4ba48f6d0c',
    '0x56ab35f06ad6489e367ccf9538fd0beae3fb2c34'
];

// Function to hash addresses
function hashAddress(addr) {
    return CryptoJS.SHA256(addr).toString();
}

// Generate leaf nodes by hashing the addresses
const leaves = eligibleAddresses.map(addr => hashAddress(addr));

// Create the Merkle Tree
const tree = new MerkleTree(leaves, CryptoJS.SHA256);

// Get the Merkle Root
const root = tree.getRoot().toString('hex');

function checkEligibility(address) {
    const leaf = hashAddress(address);

    const proof = tree.getProof(leaf);

    const isEligible = tree.verify(proof, leaf, root);

    return isEligible;
}

// Event listener for the form submission
document.getElementById('airdrop-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    const address = document.getElementById('address').value;

    const resultText = checkEligibility(address)
        ? "Eligible for airdrop."
        : "Not eligible for airdrop.";

    document.getElementById('result').textContent = resultText;
});