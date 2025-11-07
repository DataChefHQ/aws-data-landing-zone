{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  # https://devenv.sh/basics/
  env.GREET = "devenv";

  # https://devenv.sh/packages/
  packages = with pkgs; [
    gnugrep
  ];

  # https://devenv.sh/languages/
  languages.nix.enable = true;
  languages.typescript.enable = true;
  languages.javascript = {
    enable = true;
    npm = {
      enable = true;
      install.enable = true;
    };
  };

  git-hooks.hooks = {
    alejandra = {
      enable = true;
      settings.exclude = [".devenv.flake.nix"];
    };
    shellcheck.enable = true;
    eslint.enable = true;
  };

  # See full reference at https://devenv.sh/reference/options/
}
