export interface EyeFeatures {
  leftIrisX: number;
  leftIrisY: number;
  rightIrisX: number;
  rightIrisY: number;
}

export interface ScreenPoint {
  x: number;
  y: number;
}

export class GazeRegression {
  private weightsX: number[] = [];
  private weightsY: number[] = [];
  private isCalibrated: boolean = false;

  private getFeatureVector(f: EyeFeatures): number[] {
    return [
      1,
      f.leftIrisX,
      f.leftIrisY,
      f.rightIrisX,
      f.rightIrisY,
    ];
  }

  public train(samples: { features: EyeFeatures; target: ScreenPoint }[]): void {
    if (samples.length < 5) return;

    const X_mat = samples.map((s) => this.getFeatureVector(s.features));
    const Y_x = samples.map((s) => s.target.x / window.innerWidth);
    const Y_y = samples.map((s) => s.target.y / window.innerHeight);

    this.weightsX = this.solveLeastSquares(X_mat, Y_x);
    this.weightsY = this.solveLeastSquares(X_mat, Y_y);
    this.isCalibrated = true;
  }

  public predict(features: EyeFeatures): ScreenPoint | null {
    if (!this.isCalibrated) return null;

    const vec = this.getFeatureVector(features);
    let normX = 0;
    let normY = 0;

    for (let i = 0; i < vec.length; i++) {
      normX += vec[i] * (this.weightsX[i] || 0);
      normY += vec[i] * (this.weightsY[i] || 0);
    }

    normX = Math.max(0, Math.min(1, normX));
    normY = Math.max(0, Math.min(1, normY));

    return {
      x: normX * window.innerWidth,
      y: normY * window.innerHeight,
    };
  }

  private solveLeastSquares(X: number[][], Y: number[]): number[] {
    const rows = X.length;
    const cols = X[0].length;

    const XtX: number[][] = Array.from({ length: cols }, () => new Array(cols).fill(0));
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < cols; j++) {
        for (let k = 0; k < rows; k++) {
          XtX[i][j] += X[k][i] * X[k][j];
        }
        if (i === j) XtX[i][j] += 0.0001;
      }
    }

    const XtY: number[] = new Array(cols).fill(0);
    for (let i = 0; i < cols; i++) {
      for (let k = 0; k < rows; k++) {
        XtY[i] += X[k][i] * Y[k];
      }
    }

    return this.gaussianElimination(XtX, XtY);
  }

  private gaussianElimination(A: number[][], B: number[]): number[] {
    const n = B.length;
    const M = A.map((row, i) => [...row, B[i]]);

    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
      }
      [M[i], M[maxRow]] = [M[maxRow], M[i]];

      if (Math.abs(M[i][i]) < 1e-10) continue;

      for (let k = i + 1; k < n; k++) {
        const c = -M[k][i] / M[i][i];
        for (let j = i; j <= n; j++) {
          if (i === j) M[k][j] = 0;
          else M[k][j] += c * M[i][j];
        }
      }
    }

    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      x[i] = M[i][n] / (M[i][i] || 1);
      for (let k = i - 1; k >= 0; k--) {
        M[k][n] -= M[k][i] * x[i];
      }
    }
    return x;
  }

  public getStatus(): boolean {
    return this.isCalibrated;
  }
}

export const gazeModel = new GazeRegression();