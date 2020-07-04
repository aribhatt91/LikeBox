export default function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}