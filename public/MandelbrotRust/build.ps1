cargo build --target wasm32-unknown-unknown --release

echo "Optimizing: "
wasm-gc .\target\wasm32-unknown-unknown\release\mandelbrot_rust.wasm

echo "Copying to index: "
Copy-Item .\target\wasm32-unknown-unknown\release\mandelbrot_rust.wasm .\mandelbrot_rust.wasm
