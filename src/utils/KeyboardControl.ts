export default class KeyboardControl {
	public active: string[] = [];
	private listeners = ['Z', 'Q', 'S', 'D', 'Space'];
	private bindedListener: (event: KeyboardEvent) => void;
	private container: HTMLElement;

	constructor (container: HTMLElement) {
		this.bindedListener = this.listener.bind(this);
		this.container = container;
		this.container.addEventListener('keyup', this.bindedListener);
		this.container.addEventListener('keydown', this.bindedListener);
	}

	public destroy () {
		this.container.removeEventListener('keyup', this.bindedListener);
		this.container.removeEventListener('keydown', this.bindedListener);
	}

	private listener (event: KeyboardEvent) {
		// Check if the key is needed
		this.listeners.forEach((char) => {
			if (char.toLowerCase() === event.key.toLowerCase() || char.toLowerCase() === event.code.toLowerCase()) {
				// Detect wether it's up or down
				if (event.type === 'keydown') {
					if (this.active.indexOf(char) === -1) {
						this.active.push(char);
					}
				} else if (event.type === 'keyup') {
					if (this.active.indexOf(char) !== -1) {
						this.active.splice(this.active.indexOf(char), 1);
					}
				}
			}
		});
	}
}
