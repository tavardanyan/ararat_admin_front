import const_alert from '../constants/alert';

export function openConfirm(options) {
    return {
      type: const_alert.OPEN_CONFIRM,
      payload: options
    }
}
