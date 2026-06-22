  function handleStoneClicked() {
    const playerKingHasCastled = playerTurn === "white" ? whiteKingHasCastled : blackKingHasCastled;
    const playerPawnHaveMoved = playerTurn === "white" ? whitePawnsHaveMoved : blackPawnsHaveMoved;
    const setPlayerPawnHaveMoved = playerTurn === "white" ? setWhitePawnHaveMoved : setBlackPawnsHaveMoved;
    
    const clickedCellInfo = getPlayerSettingOnCell(stoneIdx, whitePiecesPositions, blackPiecesPositions);
    const selectedPlayer = getSelectedPlayerInfo(selectedPlayerPosition, whitePiecesPositions, blackPiecesPositions);
    
    // Helper to calculate moves
    const getMoves = (piece) => piece ? getMovePath(piece, playerTurn, whitePiecesPositions, blackPiecesPositions, playerKingHasCastled, playerPawnHaveMoved) : [];

    // 1. Nothing selected -> Select piece AND calculate its moves
    if (selectedPlayerPosition === -1 || !selectedPlayer) {
      if (clickedCellInfo && clickedCellInfo.color === playerTurn) {
        setPlayerSelectedPiece(stoneIdx);
        setSelectedPlayerAvailableCells(getMoves(clickedCellInfo)); // <--- FIX
      }
      return;
    }

    // 2. Clicking same piece -> Deselect
    if (selectedPlayerPosition === stoneIdx) {
      setPlayerSelectedPiece(-1);
      setSelectedPlayerAvailableCells([]);
      return;
    }
    
    // 3. Piece is selected -> Try to move
    const movePath = getMoves(selectedPlayer);
    setSelectedPlayerAvailableCells(movePath);

    if (movePath.includes(stoneIdx)) {
      setPlayerPiecesPositions((prev: PieceIndexType[]) => {
        return prev.map((piece) => piece.idx === selectedPlayerPosition ? {...piece, idx: stoneIdx} : piece);
      });
        
      if (selectedPlayer.pieceType === "pawn") {
        // Note: Ensure prev is mapped correctly if it's an array
        setPlayerPawnHaveMoved((prev: any) => prev.id === selectedPlayer.id ? {...prev, hasMovedBefore: true} : prev);
      }
        
      setPlayerTurn(prev => prev === "white" ? "black" : "white");
      setPlayerSelectedPiece(-1);
      setSelectedPlayerAvailableCells([]); // Clear after move
    } else {
      // 4. Invalid move, but clicked another friendly piece -> Switch selection
      if (clickedCellInfo && clickedCellInfo.color === playerTurn) {
        setPlayerSelectedPiece(stoneIdx);
        setSelectedPlayerAvailableCells(getMoves(clickedCellInfo)); // <--- FIX
      } else {
        console.log("invalid move");
      }
    }
  }