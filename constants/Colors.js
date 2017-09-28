// DO NOT USE DEFINITIONS FROM THIS FILE
// DO NOT ADD DEFINITIONS TO THIS FILE
// TODO: Delete this file
import { Colors as RealColors } from './Style'

const tintColor = '#000'

export default {
  tintColor,
  tabIconDefault: '#aaa',
  tabBar: '#fff',
  privateBackground: '#B6020211',
  private: RealColors.channel.private,
  closedBackground: '#4B3D6711',
  closed: RealColors.channel.closed,
  publicBackground: '#17AC1011',
  public: RealColors.channel.public,
  openBackground: '#17AC1011',
  open: '#17AC10',
  channel: {
    closed: RealColors.channel.closed,
    public: RealColors.channel.public,
    private: RealColors.channel.private,
  },
  state: {
    premium: '#00c5ff',
    alert: '#e24d4d',
    editable: '#fdffdb',
  },
  gray: {
    translucent: 'rgba(255,255,255,0.9)',
    background: '#f7f7f7',
    secondary: '#f0f0f0',
    border: '#e7e7e5',
    lighter: '#cbcbcb',
    light: '#9d9d9d',
    modal: 'rgba(58,58,58,.85)',
    text: '#585858',
    hover: '#050505',
    tab: '#fafafa',
  },
}
