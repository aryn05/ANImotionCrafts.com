export default function isFeatureGateEnabled(featureGate) {
    const features = Dribbble.JsConfig.features || {};
    const isEnabled = features[featureGate];

    if (typeof isEnabled === 'undefined') {
        console.warn(`Feature ${featureGate} does not exist`);
        return false;
    }

    return isEnabled;
}