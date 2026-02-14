/**
 * Simple PCA (Principal Component Analysis) implementation
 * Reduces n-dimensional data to 2D for visualization
 */

export interface PCAPoint {
  x: number;
  y: number;
  original?: number[];
}

export class SimplePCA {
  private mean: number[] = [];
  private components: number[][] = [];
  private explained: number[] = [];

  /**
   * Fit PCA to data
   */
  fit(data: number[][]): void {
    if (data.length === 0) return;

    const nFeatures = data[0].length;
    const nSamples = data.length;

    // Step 1: Calculate mean
    this.mean = new Array(nFeatures).fill(0);
    for (let i = 0; i < nSamples; i++) {
      for (let j = 0; j < nFeatures; j++) {
        this.mean[j] += data[i][j];
      }
    }
    for (let j = 0; j < nFeatures; j++) {
      this.mean[j] /= nSamples;
    }

    // Step 2: Center the data
    const centered: number[][] = [];
    for (let i = 0; i < nSamples; i++) {
      const row: number[] = [];
      for (let j = 0; j < nFeatures; j++) {
        row.push(data[i][j] - this.mean[j]);
      }
      centered.push(row);
    }

    // Step 3: Calculate covariance matrix
    const cov: number[][] = [];
    for (let i = 0; i < nFeatures; i++) {
      cov[i] = [];
      for (let j = 0; j < nFeatures; j++) {
        let sum = 0;
        for (let k = 0; k < nSamples; k++) {
          sum += centered[k][i] * centered[k][j];
        }
        cov[i][j] = sum / nSamples;
      }
    }

    // Step 4: Get first 2 principal components (simplified - using power iteration)
    this.components = this.getPrincipalComponents(cov, 2);
  }

  /**
   * Approximate principal components using power iteration
   */
  private getPrincipalComponents(matrix: number[][], k: number): number[][] {
    const n = matrix.length;
    const components: number[][] = [];

    for (let comp = 0; comp < k; comp++) {
      let v = new Array(n).fill(1).map(() => Math.random());

      // Power iteration
      for (let iter = 0; iter < 20; iter++) {
        // Multiply matrix by vector
        const Av: number[] = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            Av[i] += matrix[i][j] * v[j];
          }
        }

        // Normalize
        let norm = Math.sqrt(Av.reduce((sum, x) => sum + x * x, 0));
        if (norm < 1e-10) norm = 1;
        v = Av.map(x => x / norm);
      }

      components.push(v);

      // Deflate matrix (remove contribution of this component)
      const vv: number[][] = [];
      for (let i = 0; i < n; i++) {
        vv[i] = [];
        for (let j = 0; j < n; j++) {
          vv[i][j] = v[i] * v[j];
        }
      }

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          let lambda = 0;
          for (let k = 0; k < n; k++) {
            lambda += matrix[i][k] * vv[k][j];
          }
          matrix[i][j] -= lambda;
        }
      }
    }

    return components;
  }

  /**
   * Transform data to 2D using fitted components
   */
  transform(data: number[][]): PCAPoint[] {
    return data.map(row => {
      const centered = row.map((val, i) => val - this.mean[i]);
      const x = this.components[0].reduce((sum, comp, i) => sum + comp * centered[i], 0);
      const y = this.components[1].reduce((sum, comp, i) => sum + comp * centered[i], 0);
      return { x, y, original: row };
    });
  }

  /**
   * Fit and transform in one step
   */
  fitTransform(data: number[][]): PCAPoint[] {
    this.fit(data);
    return this.transform(data);
  }
}
