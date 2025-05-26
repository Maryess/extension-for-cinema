type ToggleBtn = {
  func: () => void;
  isOn: boolean;
};

export interface IToggleItem {
  title: string;
  item: ToggleBtn;
}
