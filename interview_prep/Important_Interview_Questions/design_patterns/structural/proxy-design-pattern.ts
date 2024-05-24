interface Image {
  display(): void;
}

class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadFromDisk();
  }

  display(): void {
    console.log(`Displaying ${this.filename}`);
  }

  private loadFromDisk(): void {
    console.log(`Loading ${this.filename} from disk`);
  }
}

class ProxyImage implements Image {
  private realImage: RealImage | undefined;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Usage
const image = new ProxyImage("image.jpg");
image.display(); // Loading image.jpg from disk
image.display(); // Displaying image.jpg
