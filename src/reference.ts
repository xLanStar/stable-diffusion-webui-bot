export const INFO_URL = `/info`;
export const SYSINFO_URL = `/internal/sysinfo`;
export const OPTIONS_URL = `/sdapi/v1/options`;
export const LORAS_URL = `/sdapi/v1/loras`;
export const MODELS_URL = `/sdapi/v1/sd-models`;
export const SAMPLERS_URL = `/sdapi/v1/samplers`;
export const TXT_2_IMG_URL = `/sdapi/v1/txt2img`;
export const PROGRESS_URL = `/sdapi/v1/progress`;
export const FILE_URL = (modelName: string): string => `/file=./models/Stable-diffusion/${modelName}.preview.png`