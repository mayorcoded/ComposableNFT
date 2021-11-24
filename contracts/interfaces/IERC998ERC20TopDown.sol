pragma solidity 0.7.6;

interface IERC998ERC20TopDown {
    event ReceivedERC20(address indexed _from, uint256 indexed _tokenId, address indexed _erc20Contract, uint256 _value);
    event TransferERC20(uint256 indexed _tokenId, address indexed _to, address indexed _erc20Contract, uint256 _value);

    function balanceOfERC20(uint256 _tokenId, address __erc20Contract) external view returns (uint256);
    function getERC20(address _from, uint256 _tokenId, address _erc20Contract, uint256 _value) external;
    function transferERC20(uint256 _tokenId, address _to, address _erc20Contract, uint256 _value) external;
    function transferERC223(uint256 _tokenId, address _to, address _erc223Contract, uint256 _value, bytes calldata _data) external;
    function tokenFallback(address _from, uint256 _value, bytes calldata _data) external;
}
