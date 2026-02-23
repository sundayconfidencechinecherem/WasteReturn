// app/api/storage/kv/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { storeKV, retrieveKV } from '@/lib/services/zgStorage';

export async function POST(request: NextRequest) {
  try {
    const { streamId, key, value } = await request.json();

    if (!streamId || !key) {
      return NextResponse.json(
        { error: 'Stream ID and key are required' },
        { status: 400 }
      );
    }

    const result = await storeKV(streamId, key, value);

    return NextResponse.json({
      success: result.success,
      data: { txHash: result.txHash }
    });

  } catch (error) {
    console.error('KV store API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'KV store failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const streamId = searchParams.get('streamId');
    const key = searchParams.get('key');

    if (!streamId || !key) {
      return NextResponse.json(
        { error: 'Stream ID and key are required' },
        { status: 400 }
      );
    }

    const result = await retrieveKV(streamId, key);

    return NextResponse.json({
      success: result.success,
      data: { value: result.value }
    });

  } catch (error) {
    console.error('KV retrieve API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'KV retrieve failed' },
      { status: 500 }
    );
  }
}