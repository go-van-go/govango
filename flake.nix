{
  description = "Test flake";

  outputs = { self }: {
    devShell = { pkgs, ... }: pkgs.mkShell {
      buildInputs = [ pkgs.hello ];
    };
  };
}
