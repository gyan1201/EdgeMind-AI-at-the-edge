export type PrecisionKey = "fp32" | "fp16" | "int8" | "int4";

export type Precision = {
    key: PrecisionKey;
    label: string;
    bytes: number;
    latency: number;
    accuracy: number;
    ram: number;
    energy: number;
    note: string;
};

export const PRECISIONS: Precision[] = [
    {
        key: "fp32",
        label: "FP32",
        bytes: 4,
        latency: 1,
        accuracy: 0,
        ram: 1,
        energy: 1,
        note: "Reference accuracy, largest footprint.",
    },
    {
        key: "fp16",
        label: "FP16",
        bytes: 2,
        latency: 0.72,
        accuracy: -0.1,
        ram: 0.78,
        energy: 0.66,
        note: "Half the flash, near-identical output.",
    },
    {
        key: "int8",
        label: "INT8",
        bytes: 1,
        latency: 0.41,
        accuracy: -0.5,
        ram: 0.55,
        energy: 0.38,
        note: "Calibrated per-channel, default for edge.",
    },
    {
        key: "int4",
        label: "INT4",
        bytes: 0.5,
        latency: 0.29,
        accuracy: -2.1,
        ram: 0.44,
        energy: 0.27,
        note: "Tiny models, wider accuracy risk.",
    },
];

export type ModelProfile = {
    id: string;
    name: string;
    task: string;
    sensor: string;
    paramsM: number;
    baseLatency: number;
    baseAccuracy: number;
    baseRam: number;
    unit: string;
};

export const MODELS: ModelProfile[] = [
    {
        id: "bearing",
        name: "BearingNet-1D",
        task: "Bearing wear · imbalance · cavitation",
        sensor: "3-axis vibration probe",
        paramsM: 0.31,
        baseLatency: 4.8,
        baseAccuracy: 96.4,
        baseRam: 2.4,
        unit: "acc",
    },
    {
        id: "acoustic",
        name: "AcousticSpec-CNN",
        task: "Leaks · arcing · machine state",
        sensor: "16 kHz MEMS microphone",
        paramsM: 1.42,
        baseLatency: 18.2,
        baseAccuracy: 93.8,
        baseRam: 11.6,
        unit: "acc",
    },
    {
        id: "vision",
        name: "TinyDet-Vision",
        task: "Presence · defects · safety zones",
        sensor: "640×480 global shutter",
        paramsM: 2.94,
        baseLatency: 41.5,
        baseAccuracy: 76.2,
        baseRam: 28.4,
        unit: "mAP",
    },
    {
        id: "climate",
        name: "EnvFusion-MLP",
        task: "Heat spikes · air-quality drift",
        sensor: "Temp · RH · VOC · PM2.5",
        paramsM: 0.08,
        baseLatency: 0.9,
        baseAccuracy: 98.2,
        baseRam: 0.8,
        unit: "acc",
    },
];

export type TargetKey = "mcu" | "sbc" | "gateway";

export type Target = {
    key: TargetKey;
    label: string;
    detail: string;
    flash: number;
    ram: number;
    latencyScale: number;
    tops: string;
};

export const TARGETS: Target[] = [
    {
        key: "mcu",
        label: "MCU class",
        detail: "Cortex-M7 · 480 MHz",
        flash: 2,
        ram: 1,
        latencyScale: 21,
        tops: "0.001 TOPS",
    },
    {
        key: "sbc",
        label: "SBC class",
        detail: "Cortex-A53 · 1.2 GHz",
        flash: 64,
        ram: 512,
        latencyScale: 1,
        tops: "0.05 TOPS",
    },
    {
        key: "gateway",
        label: "Gateway class",
        detail: "x86 · 4 cores",
        flash: 2048,
        ram: 8192,
        latencyScale: 0.46,
        tops: "1.4 TOPS",
    },
];

export function bundleSize(model: ModelProfile, precision: Precision, pruned: boolean) {
    const params = model.paramsM * (pruned ? 0.58 : 1);
    return params * precision.bytes;
}

export type SignalKey = "vibration" | "acoustic" | "vision" | "climate";

export type SignalSource = {
    key: SignalKey;
    label: string;
    sensor: string;
    rate: string;
    window: string;
    model: string;
    bundle: string;
    threshold: number;
    normal: string;
    faults: string[];
    axisLabel: string;
    scale: number;
    eventRate: number;
};

export const SIGNAL_SOURCES: SignalSource[] = [
    {
        key: "vibration",
        label: "Vibration",
        sensor: "accel · 3-axis",
        rate: "12.8 kHz",
        window: "1024 samples",
        model: "BearingNet-1D · INT8",
        bundle: "0.31 MB",
        threshold: 0.82,
        normal: "nominal",
        faults: ["outer-race-wear", "imbalance", "cavitation"],
        axisLabel: "g",
        scale: 1,
        eventRate: 0.09,
    },
    {
        key: "acoustic",
        label: "Acoustic",
        sensor: "MEMS mic",
        rate: "16 kHz",
        window: "2048 samples",
        model: "AcousticSpec-CNN · INT8",
        bundle: "1.42 MB",
        threshold: 0.78,
        normal: "background",
        faults: ["compressed-air-leak", "arcing", "bearing-whine"],
        axisLabel: "dBFS",
        scale: 0.82,
        eventRate: 0.12,
    },
    {
        key: "vision",
        label: "Vision",
        sensor: "global shutter",
        rate: "8 fps",
        window: "640×480",
        model: "TinyDet-Vision · INT8",
        bundle: "2.94 MB",
        threshold: 0.74,
        normal: "clear",
        faults: ["person-in-zone", "surface-defect", "blocked-lane"],
        axisLabel: "px",
        scale: 1.35,
        eventRate: 0.16,
    },
    {
        key: "climate",
        label: "Climate",
        sensor: "T/RH/VOC/PM",
        rate: "1 Hz",
        window: "60 samples",
        model: "EnvFusion-MLP · INT8",
        bundle: "0.08 MB",
        threshold: 0.86,
        normal: "stable",
        faults: ["heat-spike", "voc-rise", "pm-burst"],
        axisLabel: "idx",
        scale: 0.55,
        eventRate: 0.05,
    },
];

export type Deployment = {
    sensor: string;
    signal: string;
    useCase: string;
    model: string;
    size: string;
    latency: string;
    target: string;
};

export const DEPLOYMENTS: Deployment[] = [
    {
        sensor: "Vibration probes",
        signal: "3-axis accel · 12.8 kHz",
        useCase: "Bearing wear, imbalance, cavitation",
        model: "BearingNet-1D",
        size: "0.31 MB",
        latency: "4.2 ms",
        target: "Cortex-A53",
    },
    {
        sensor: "Acoustic arrays",
        signal: "16 kHz spectrograms",
        useCase: "Compressed-air leaks, arcing, machine state",
        model: "AcousticSpec-CNN",
        size: "1.42 MB",
        latency: "9.6 ms",
        target: "Cortex-A53",
    },
    {
        sensor: "Low-power cameras",
        signal: "640×480 @ 8 fps",
        useCase: "Presence, quality checks, safety zones",
        model: "TinyDet-Vision",
        size: "2.94 MB",
        latency: "26 ms",
        target: "A53 + NPU",
    },
    {
        sensor: "Environmental nodes",
        signal: "Temp, RH, VOC, PM2.5",
        useCase: "Heat spikes, air-quality drift, occupancy cues",
        model: "EnvFusion-MLP",
        size: "0.08 MB",
        latency: "0.6 ms",
        target: "Cortex-M4",
    },
];

export type Ring = {
    id: string;
    name: string;
    cumulative: number;
    devices: number;
    gate: string;
};

export const RINGS: Ring[] = [
    { id: "canary", name: "Canary", cumulative: 2, devices: 24, gate: "error < 0.5% · drift < 0.8%" },
    { id: "early", name: "Early access", cumulative: 12, devices: 120, gate: "error < 0.8% · drift < 1.0%" },
    { id: "broad", name: "Broad", cumulative: 45, devices: 396, gate: "error < 1.0% · drift < 1.5%" },
    { id: "fleet", name: "Full fleet", cumulative: 100, devices: 660, gate: "error < 1.0% · drift < 1.5%" },
];

export const EVENT_ENVELOPE = `{
  "v": 1,
  "device": "vib-node-07",
  "site": "line-04/ghaziabad",
  "model": "bearingnet-1d@3.2.1",
  "window": "2026-10-27T09:41:07.220Z/1024",
  "class": "outer-race-wear",
  "score": 0.94,
  "threshold": 0.82,
  "features": { "rms": 0.371, "kurtosis": 4.82, "bpfo": 118.4 },
  "bundle": "sha256:7f3ac1c4…9d02",
  "sig": "ed25519:5c1e88…a71b"
}`;

export const WORKLOAD_MANIFEST = `# edgemind/workload.yaml
workload: bearing-fault
model:
  format: tflite-int8
  path: models/bearingnet-1d.tflite
  bundle: sha256:7f3ac1c4…9d02
input:
  source: iio/accel0
  rate: 12.8kHz
  window: 1024
  stride: 256
infer:
  threads: 2
  arena_kb: 640
emit:
  transport: mqtt
  threshold: 0.82
  cooldown: 15s
  payload: event
limits:
  cpu: 15%
  ram_mb: 42
  thermal: nominal`;

export const TICKER = [
    "INT8 calibrated",
    "Ed25519 signed bundles",
    "OTA with ring gates",
    "MQTT 5 · gRPC · REST",
    "Cortex-M / A · RISC-V",
    "offline store-and-forward",
    "0.9 MB median bundle",
    "34 ms median decision",
    "no raw stream egress",
    "drift watch per ring",
];
