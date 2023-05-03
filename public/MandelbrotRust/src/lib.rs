use num::Complex;
use core::sync::atomic::{AtomicU32, Ordering};

const WIDTH: usize = 700;
const HEIGHT: usize = 700;

const THRESHOLD: f64 = 90.0;
const MAX_ITERATIONS: u32 = 20;

static FRAME: AtomicU32 = AtomicU32::new(0);

#[no_mangle]
static mut BUFFER: [u32; WIDTH * HEIGHT] = [0; WIDTH * HEIGHT];

#[no_mangle]
pub unsafe extern fn go() {
    render_frame(&mut BUFFER)
}

fn test(c: Complex<f64>, detail: u32) -> u32 {

    let mut z = Complex::new(0.0, 0.0);
    let mut it = 0;

    while z.norm() < THRESHOLD {
        z = z*z + c;
        it += 1;

        if it > detail {
            return 0;
        }
    }

    return it;
}

fn render_frame(buffer: &mut [u32; WIDTH * HEIGHT]) {

    let f = FRAME.fetch_add(1, Ordering::Relaxed);
    let detail = if f < MAX_ITERATIONS { f } else { MAX_ITERATIONS };
    let zoom = 4.0;

    for y in 0..HEIGHT {
        for x in 0..WIDTH {

            let x_cor = -0.5 + (0.5 - x as f64 / WIDTH as f64) * zoom;
            let y_cor = (0.5 - y as f64 / HEIGHT as f64) * zoom;

            let it = test(Complex::new(x_cor, y_cor), detail);
            if it > 4 {
                buffer[y * WIDTH + x] = !0 - (0x00_0F_00_FA * it) + 0xFF_00_00_00;
            }
        }
    }
}
